from datetime import timedelta
from django.utils import timezone
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from django.conf import settings
from django.shortcuts import get_object_or_404

import os
from openai import OpenAI

from users.serializers import UserSerializer

from .models import Article
from .serializers import ArticleSerializer, GenerateArticleSerializer
from .markdown import upload_markdown, delete_markdown, get_signed_url
from .prompts import article_generation_prompt

class ArticleAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        articles = Article.objects.filter(user=request.user).order_by('-created_at')
        serializer = ArticleSerializer(articles, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        content = request.data['content']
        # remove content key from request data
        request.data.pop('content')
        
        serializer = ArticleSerializer(data=request.data)
        if serializer.is_valid():
            user_obj = UserSerializer(request.user).data
            try:
                content_url = upload_markdown(serializer.validated_data['title'], user_obj['id'], content)
            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
            
            # set content_url
            serializer.validated_data['content_url'] = content_url
            
            # set expiration time
            expires_in = 3600  # 1 hour
            expiration_time = timezone.now() + timedelta(seconds=expires_in)
            serializer.validated_data['content_url_expiration'] = expiration_time
            
            serializer.save(user=request.user)
            
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class ArticleDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id):
        article = get_object_or_404(Article, id=id, user=request.user)
        serializer = ArticleSerializer(article)
        
        # if expiration_time is passed, generate new signed url
        if article.content_url_expiration and article.content_url_expiration < timezone.now():
            # get bucket name from settings
            bucket_name = settings.SUPABASE_BUCKET
            
            # get user_id
            user_id = UserSerializer(request.user).data['id']
            
            # get file name 
            file_name = article.title.replace(" ", "_").lower()
            
            # make file path
            file_path = f"{bucket_name}/{user_id}/{file_name}"
            article.content_url = get_signed_url(article.content_url)
            article.content_url_expiration = timezone.now() + timedelta(seconds=3600)
            article.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, id):
        article = get_object_or_404(Article, id=id, user=request.user)
        serializer = ArticleSerializer(article, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, id):
        article = get_object_or_404(Article, id=id, user=request.user)
        
        # delete the file in supabase storage first
        bucket_name = settings.SUPABASE_BUCKET
        
        # get user_id
        user_id = UserSerializer(request.user).data['id']
        
        # get file name
        file_name = article.title.replace(" ", "_").lower()
        
        # make file path
        file_path = f"{bucket_name}/{user_id}/{file_name}"
        
        delete_markdown(file_path)
        article.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
class GenerateArticleView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        # Validate input data using serializer
        serializer = GenerateArticleSerializer(data=request.data)
        if serializer.is_valid():
            validated_data = serializer.validated_data
            title = validated_data['title']
            keywords = validated_data.get('keywords', '')
            outline = validated_data.get('outline', '')
            target_audience = validated_data.get('target_audience', '')

            keywords_str = ", ".join(keywords)
            # Generate content using ChatGPT API
            prompt = article_generation_prompt.format(title, keywords_str, outline, target_audience)
            
            # make OpenAI Client
            openai = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
            response = openai.chat.completions.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": "You are an expert SEO content writer. Your task is to generate a well-structured, engaging, and SEO-friendly blog post in Markdown format."},
                    {"role": "user", "content": prompt}
                ],
                max_tokens=2500
            )
            content = response.choices[0].message.content.strip()

            # get user obj to get user id
            user_obj = UserSerializer(request.user).data
            
            # upload the article to supabase
            content_url = upload_markdown(title, user_obj['id'], content)
            
            # Save the article to the database
            article = Article.objects.create(
                user=request.user,
                title=title,
                keywords=keywords,
                outline=outline,
                target_audience=target_audience,
                content_url=content_url,
                content_url_expiration=timezone.now() + timedelta(seconds=3600)
            )

            # Return the created article data
            article_serializer = ArticleSerializer(article)
            return Response(article_serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
