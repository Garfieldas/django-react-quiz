from django.urls import path
from . views import get_choices, get_questions

urlpatterns = [
    path('questions/', get_questions, name='questions'),
    path('choices/', get_choices, name='choices'),
]
