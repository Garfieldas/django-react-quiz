from django.contrib import admin
from django.utils.translation import gettext_lazy as _
from .models import UserAnswer, Choice, Question


@admin.register(UserAnswer)
class UserAnswerAdmin(admin.ModelAdmin):
    # Specify the columns to display
    list_display = (
        'user_name_display', 
        'last_name_display', 
        'question_text_display', 
        'selected_choice_display', 
        'text_answer_display'
    )

    # Filters for related fields
    list_filter = (
        'user_name',  # Filter by Vartotojas
        'last_name',  # Filter by Pavardė
        ('question', admin.RelatedOnlyFieldListFilter),  # Klausimas
        ('selected_choice', admin.RelatedOnlyFieldListFilter),  # Atsakymas
    )

    # Specify searchable fields
    search_fields = (
        'user_name', 
        'last_name', 
        'question__question_text', 
        'selected_choice__choice_text', 
        'text_answer'
    )

    # Custom column for user name (Vartotojas)
    def user_name_display(self, obj):
        return obj.user_name or _("Nėra nurodyta")
    user_name_display.short_description = _('Vartotojas')

    # Custom column for last name (Pavardė)
    def last_name_display(self, obj):
        return obj.last_name or _("Nėra nurodyta")
    last_name_display.short_description = _('Pavardė')

    # Custom column for question text (Klausimas)
    def question_text_display(self, obj):
        return obj.question.question_text if obj.question else _("Nėra klausimo")
    question_text_display.short_description = _('Klausimas')

    # Custom column for selected choice (Atsakymas)
    def selected_choice_display(self, obj):
        return obj.selected_choice.choice_text if obj.selected_choice else _("Tekstinis atsakymas")
    selected_choice_display.short_description = _('Atsakymas')

    # Custom column for text answers (Tekstinis atsakymas)
    def text_answer_display(self, obj):
        return obj.text_answer or _("Nėra atsakymo")
    text_answer_display.short_description = _('Tekstinis atsakymas')


# Register related models with default admin
@admin.register(Choice)
class ChoiceAdmin(admin.ModelAdmin):
    list_display = ('choice_text', 'question')
    search_fields = ('choice_text', 'question__question_text')
    list_filter = ('question',)


@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('question_text',)
    search_fields = ('question_text',)
