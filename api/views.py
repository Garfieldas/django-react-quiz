from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Question, Choice
from .serializer import QuestionSerializer, ChoiceSerializer, UserAnswerSerializer
from django.views.decorators.csrf import csrf_exempt

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

# @api_view(["POST"])
# def submit_answers(request):
#     data = request.data

#     for item in data:
#         serializer = UserAnswerSerializer(data={
#             'demo_user': "DemoUser",
#             'question': item.get('question'),
#             'selected_choice': item.get('selected_choice')
#         })
#         if serializer.is_valid():
#             serializer.save()
#         else:
#             return Response(serializer.errors, status=400)

#     return Response({'status': 'success'}, status=201)

@csrf_exempt
@api_view(["POST"])
def submit_answers(request):
    data = request.data  # This should be a list of answers

    # Validate if the request data is a list
    if not isinstance(data, list):
        return Response({'error': 'Expected a list of answers'}, status=400)

    errors = []

    for item in data:
        # Ensure required fields are present
        if 'question' not in item or 'selected_choice' not in item:
            errors.append({'error': 'Missing required fields', 'item': item})
            continue
        
        # Create a serializer instance
        serializer = UserAnswerSerializer(data={
            'user_name': item.get('user_name', 'Unknown'),
            'last_name': item.get('last_name', 'Unknown'),
            'question': item['question'],
            'selected_choice': item['selected_choice']
        })
        
        # Validate and save each item
        if serializer.is_valid():
            serializer.save()
        else:
            errors.append(serializer.errors)

    if errors:
        return Response({'status': 'partial_success', 'errors': errors}, status=207)

    return Response({'status': 'success'}, status=201)