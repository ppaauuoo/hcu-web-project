from django.contrib import admin

from .models import BlogIndexPage, BlogPage, DetailBlog

admin.site.register(BlogIndexPage)
admin.site.register(BlogPage)
admin.site.register(DetailBlog)