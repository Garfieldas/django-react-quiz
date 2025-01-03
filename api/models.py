from django.db import models

# Create your models here.

class Question(models.Model):
    question_text = models.CharField(max_length=200)
    question_status = models.BooleanField(default=False)

class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='choices') 
    choice_text = models.CharField(max_length=200)
    is_correct = models.BooleanField(default=False)
