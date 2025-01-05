from django.contrib import admin
from .models import UserAnswer, Choice, Question

@admin.register(UserAnswer)
class UserAnswerAdmin(admin.ModelAdmin):
    # Specify the columns to display
    list_display = ('user_name_display', 'last_name_display', 'question_text_display', 'selected_choice_display')
    
    # Custom filters with localized names
    list_filter = (
        ('user_name', admin.AllValuesFieldListFilter),  # Custom filter for Vardas
        ('last_name', admin.AllValuesFieldListFilter),  # Custom filter for Pavardė
        ('question', admin.RelatedOnlyFieldListFilter),  # Custom filter for Klausimas
        ('selected_choice', admin.RelatedOnlyFieldListFilter),  # Custom filter for Atsakymas
    )

    # Specify search fields
    search_fields = ('user_name', 'last_name', 'question__question_text', 'selected_choice__choice_text')

    # Custom column for user name (Vartotojas)
    def user_name_display(self, obj):
        return obj.user_name
    user_name_display.short_description = 'Vartotojas'

    # Custom column for last name (Pavardė)
    def last_name_display(self, obj):
        return obj.last_name
    last_name_display.short_description = 'Pavardė'

    # Custom column for question text (Klausimas)
    def question_text_display(self, obj):
        return obj.question.question_text
    question_text_display.short_description = 'Klausimas'

    # Custom column for selected choice (Atsakymas)
    def selected_choice_display(self, obj):
        return obj.selected_choice.choice_text
    selected_choice_display.short_description = 'Atsakymas'
admin.site.register(Choice)
admin.site.register(Question)
