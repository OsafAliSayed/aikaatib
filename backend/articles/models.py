from django.db import models
from django.contrib.auth.models import User

class Article(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    keywords = models.TextField()
    outline = models.TextField(blank=True, null=True)
    target_audience = models.TextField()
    content = models.TextField()  # Generated & edited content
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title