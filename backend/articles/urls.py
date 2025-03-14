from django.urls import path
from .views import generate_article, get_article, edit_article, refine_article

urlpatterns = [
    path('generate/', generate_article, name='generate_article'),
    path('<int:article_id>/', get_article, name='get_article'),
    path('<int:article_id>/edit/', edit_article, name='edit_article'),
    path('<int:article_id>/refine/', refine_article, name='refine_article'),
]
