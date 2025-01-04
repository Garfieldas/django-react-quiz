from django.contrib import admin
from .models import UserAnswer, Choice, Question


@admin.register(UserAnswer)
class UserAnswerAdmin(admin.ModelAdmin):
    list_display = ('demo_user', 'question_text', 'selected_choice_text')
    list_filter = ('demo_user', 'question')
    readonly_fields = ('demo_user', 'question', 'selected_choice')

    # Display the text of the question
    def question_text(self, obj):
        return obj.question.question_text

    question_text.short_description = 'Question'

    # Display the text of the selected choice
    def selected_choice_text(self, obj):
        return obj.selected_choice.choice_text

    selected_choice_text.short_description = 'Selected Choice'

admin.site.register(Choice)
admin.site.register(Question)
