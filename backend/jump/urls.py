from django.urls import path, include
from jump import views


urlpatterns = [
    path('', views.user_jumps),
    path('all/', views.get_all_jumps),
]