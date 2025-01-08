from django.db import models

# Create your models here.
class Question(models.Model):
    question_text = models.CharField(max_length=200)
    is_text_field = models.BooleanField(default=False)
    class Meta:
        verbose_name = "Klausimas"  # Singular name
        verbose_name_plural = "Klausimai"  # Plural name

    def __str__(self):
        return self.question_text

class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='choices') 
    choice_text = models.CharField(max_length=200)
    is_correct = models.BooleanField(default=False)
    class Meta:
        verbose_name = "Pasirinkimas"  # Singular name
        verbose_name_plural = "Pasirinkimai"  # Plural name

    def __str__(self):
        return self.choice_text

class UserAnswer(models.Model):
    user_name = models.CharField(max_length=250, default='unknown')
    last_name = models.CharField(max_length=250, default='unknown')
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    selected_choice = models.ForeignKey(Choice, on_delete=models.CASCADE, null=True, blank=True)
    text_answer = models.CharField(max_length=500, blank=True, null=True)


    class Meta:
        verbose_name = "Vartotojo atsakymas"  # Singular name
        verbose_name_plural = "Vartotoju atsakymai"  # Plural name
    
    def __str__(self):
        return self.user_name