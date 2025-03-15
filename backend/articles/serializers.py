from rest_framework import serializers
from .models import Article

class GenerateArticleSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=255)
    keywords = serializers.CharField(max_length=255, required=False, allow_blank=True)
    outline = serializers.CharField(required=False, allow_blank=True)
    target_audience = serializers.CharField(required=False, allow_blank=True)

class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = '__all__'
