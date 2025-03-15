from django.urls import path
from .views import ArticleAPIView, ArticleDetailAPIView, GenerateArticleView
urlpatterns = [
    path('articles/', ArticleAPIView.as_view(), name='articles'),
    path('articles/<int:id>/', ArticleDetailAPIView.as_view(), name='article-detail'),
    
    path('articles/generate/', GenerateArticleView.as_view(), name='generate-article'),
]
