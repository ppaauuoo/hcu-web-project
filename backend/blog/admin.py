from django.contrib import admin

from .models import BlogIndexPage, BlogPage

admin.site.register(BlogIndexPage)
admin.site.register(BlogPage)