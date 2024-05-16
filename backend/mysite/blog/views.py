from django.shortcuts import render
from django.views import generic
from .models import BlogIndexPage

# Create your views here.
class IndexView(generic.ListView):
    model = BlogIndexPage
    template_name = "blog/blog_index_page.html"
