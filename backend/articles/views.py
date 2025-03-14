from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from django.shortcuts import get_object_or_404

import os
from openai import OpenAI
from .models import Article
from .serializers import ArticleSerializer, GenerateArticleSerializer

class ArticleAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        articles = Article.objects.filter(user=request.user)
        serializer = ArticleSerializer(articles, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = ArticleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class ArticleDetailAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, id):
        article = get_object_or_404(Article, id=id, user=request.user)
        serializer = ArticleSerializer(article)
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

            # Generate content using ChatGPT API
            prompt = f"""
                ### **Instructions:**  
                1. **Format:** Use Markdown syntax for headings, subheadings, lists, bold, italics, code sections and links.  
                2. **SEO Optimization:** Naturally incorporate provided **keywords** throughout the article for better ranking.  
                3. **Word length:** Keep the article length between 2500-3000 words.
                4. **Structure:**  
                - Start with a catchy **title** (H1)  
                - Include a well-crafted **introduction**  
                - Use multiple **subheadings (H2, H3, H4)** to organize content  
                - Provide **detailed sections** with valuable insights  
                - Include **bullet points or numbered lists** for readability  
                - End with a strong **conclusion & call to action**  

                ### **User Input:**  
                - **Title (Required):** {title}  
                - **Keywords (Optional):** {keywords if keywords else 'Not Provided'}  
                - **Outline (Optional):** {outline if outline else 'Generate a logical structure'}  
                - **Target Audience (Optional):** {target_audience if target_audience else 'General audience'}

                Now, generate the blog post based on these inputs.
            """
            
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


            # Save the article to the database
            article = Article.objects.create(
                user=request.user,
                title=title,
                keywords=keywords,
                outline=outline,
                target_audience=target_audience,
                content=content
            )

            # Return the created article data
            article_serializer = ArticleSerializer(article)
            return Response(article_serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
