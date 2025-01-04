from django.urls import path
from . views import get_choices, get_questions, submit_answers

urlpatterns = [
    path('questions/', get_questions, name='questions'),
    path('choices/', get_choices, name='choices'),
    path('submit_answers/', submit_answers, name='submit_answers'),
]
