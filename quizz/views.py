from django.shortcuts import render

def index(request):
    return render(request, 'index.html')  # This assumes your React app's index.html is in the build folder