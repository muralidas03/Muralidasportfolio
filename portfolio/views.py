from django.shortcuts import render

def index(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            # Process the form data
            name = form.cleaned_data['name']
            email = form.cleaned_data['email']
            subject = form.cleaned_data['subject']
            message = form.cleaned_data['message']
            
            # Send email (configure email settings in settings.py)
            send_mail(
                f"Contact Form: {subject}",
                f"From: {name} <{email}>\n\n{message}",
                email,  # from email
                [settings.DEFAULT_FROM_EMAIL],  # to email
                fail_silently=False,
            )
            
            # Add success message
            messages.success(request, 'Your message has been sent successfully!')
            return redirect('contact')  # or your desired redirect
            
    else:
        form = ContactForm()
    return render(request, 'index.html',{'form': form})

# views.py
from django.shortcuts import render, redirect
from django.core.mail import send_mail
from django.conf import settings
from django.contrib import messages
from .forms import ContactForm

def contact_view(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            # Process the form data
            name = form.cleaned_data['name']
            email = form.cleaned_data['email']
            subject = form.cleaned_data['subject']
            message = form.cleaned_data['message']
            
            # Send email (configure email settings in settings.py)
            send_mail(
                f"Contact Form: {subject}",
                f"From: {name} <{email}>\n\n{message}",
                email,  # from email
                [settings.DEFAULT_FROM_EMAIL],  # to email
                fail_silently=False,
            )
            
            # Add success message
            messages.success(request, 'Your message has been sent successfully!')
            return redirect('index')  # or your desired redirect
        else:
            print('form',form.errors)
    else:
        form = ContactForm()
    return render(request, 'index.html', {'form': form})