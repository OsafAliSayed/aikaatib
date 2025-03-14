from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Article
from .serializers import ArticleSerializer

@api_view(['POST'])
def generate_article(request):
    """
    Generate an article based on user input.
    """
    serializer = ArticleSerializer(data=request.data)
    if serializer.is_valid():
        # Placeholder for AI-based article generation logic
        serializer.validated_data['content'] = f"Generated content for: {serializer.validated_data['title']}"
        article = serializer.save()
        return Response(ArticleSerializer(article).data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_article(request, article_id):
    """
    Retrieve an article by its ID.
    """
    try:
        article = Article.objects.get(id=article_id)
        return Response(ArticleSerializer(article).data, status=status.HTTP_200_OK)
    except Article.DoesNotExist:
        return Response({"error": "Article not found"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['PUT'])
def edit_article(request, article_id):
    """
    Allow users to edit an article.
    """
    try:
        article = Article.objects.get(id=article_id)
    except Article.DoesNotExist:
        return Response({"error": "Article not found"}, status=status.HTTP_404_NOT_FOUND)

    serializer = ArticleSerializer(article, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def refine_article(request, article_id):
    """
    Allow users to refine specific sections of an article.
    """
    try:
        article = Article.objects.get(id=article_id)
    except Article.DoesNotExist:
        return Response({"error": "Article not found"}, status=status.HTTP_404_NOT_FOUND)

    # Placeholder for AI-driven refinement
    refinement_request = request.data.get('refinement', '')
    article.content += f"\n[Refinement: {refinement_request}]"  # Simulating refinement
    article.save()

    return Response(ArticleSerializer(article).data, status=status.HTTP_200_OK)
