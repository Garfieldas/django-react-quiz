from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Question, Choice
from .serializer import QuestionSerializer, ChoiceSerializer, UserAnswerSerializer

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

@api_view(["POST"])
def submit_answers(request):
    data = request.data

    for item in data:
        serializer = UserAnswerSerializer(data={
            'demo_user': "DemoUser",
            'question': item.get('question'),
            'selected_choice': item.get('selected_choice')
        })
        if serializer.is_valid():
            serializer.save()
        else:
            return Response(serializer.errors, status=400)

    return Response({'status': 'success'}, status=201)