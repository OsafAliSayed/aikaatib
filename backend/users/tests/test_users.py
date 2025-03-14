import pytest
from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import RefreshToken

from django.contrib.auth.models import User
from users.models import Profile  # Adjust the import according to your app name

@pytest.fixture
def api_client():
    return APIClient()

@pytest.fixture
def create_test_user(db):
    def create_user(username="testuser", email="test@example.com", password="testpass123"):
        return User.objects.create_user(username=username, email=email, password=password)
    return create_user

@pytest.fixture
def get_tokens(api_client, create_test_user):
    user = create_test_user()
    response = api_client.post('/api/auth/login/', {'username': user.username, 'password': 'testpass123'}, format='json')
    return response.data

@pytest.mark.django_db
def test_user_registration(api_client):
    response = api_client.post('/api/auth/register/', {
        'username': 'newuser',
        'email': 'newuser@example.com',
        'password': 'securepassword'
    }, format='json')

    assert response.status_code == 201
    assert User.objects.filter(username='newuser').exists()

@pytest.mark.django_db
def test_user_login(api_client, create_test_user):
    create_test_user()
    response = api_client.post('/api/auth/login/', {
        'username': 'testuser',
        'password': 'testpass123'
    }, format='json')

    assert response.status_code == 200
    assert 'access' in response.data
    assert 'refresh' in response.data

@pytest.mark.django_db
def test_invalid_login(api_client):
    response = api_client.post('/api/auth/login/', {
        'username': 'wronguser',
        'password': 'wrongpass'
    }, format='json')

    assert response.status_code == 401
    assert 'access' not in response.data

@pytest.mark.django_db
def test_token_refresh(api_client, get_tokens):
    refresh_token = get_tokens['refresh']
    response = api_client.post('/api/auth/refresh/', {'refresh': refresh_token}, format='json')

    assert response.status_code == 200
    assert 'access' in response.data

@pytest.mark.django_db
def test_profile_creation():
    user = User.objects.create_user(username='testuser', password='testpassword')
    
    # Check if the profile is created
    profile = Profile.objects.get(user=user)
    
    assert profile is not None
    assert profile.user == user
    assert profile.current_ammount == 0.00  # Default value for funds