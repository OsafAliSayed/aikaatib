from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import AuthView, UserView, LogoutView

urlpatterns = [
    # Authentication endpoints
    path('auth/register/', AuthView.as_view(), name='register_user'),
    path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/logout/', LogoutView.as_view(), name='logout'),
    
    # User endpoints
    path('user/', UserView.as_view(), name='user_view'),
    
]
