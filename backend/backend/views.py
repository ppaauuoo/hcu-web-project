from django.contrib.auth import authenticate, login
from django.contrib.sessions.models import Session
from django.shortcuts import redirect, render



def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            # set user-specific data in the session
            request.session['username'] = username
            request.session.save()
            return redirect('home')
        else:
            # handle invalid login
            return redirect('home')
    else:
        # display the login form
        return render(request, "registration/login.html")

from django.contrib.auth import logout

def logout_view(request):
    logout(request)
    # clear the user's session data
    Session.objects.filter(session_key=request.session.session_key).delete()
    return redirect('home')

def protected_view(request):
    if request.user.is_authenticated:
        # user is authenticated, allow access
        ...
    else:
        # user is not authenticated, redirect to login
        return redirect('login')