from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Question, Choice
from .serializer import QuestionSerializer, ChoiceSerializer

@api_view(["GET"])
def get_questions(request):
    questions = Question.objects.all()
    serializer = QuestionSerializer(questions, many=True)

    return Response(serializer.data)

@api_view(["GET"])
def get_choices(request):
    choices = Choice.objects.all()
    serializer = ChoiceSerializer(choices, many=True)
    
    return Response(serializer.data)