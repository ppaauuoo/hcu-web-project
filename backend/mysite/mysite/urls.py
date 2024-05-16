from django.conf import settings
from django.conf.urls.static import static

from django.contrib import admin
from django.urls import include, path, re_path
from django.views.generic.base import TemplateView

from .api import api_router

from wagtail.admin import urls as wagtailadmin_urls
from wagtail import urls as wagtail_urls
from wagtail.documents import urls as wagtaildocs_urls

urlpatterns = [
    path("admin/", admin.site.urls),
    path("accounts/", include("accounts.urls")),
    path("accounts/", include("django.contrib.auth.urls")),
    path("", TemplateView.as_view(template_name="home.html"), name="home"),
    path("blog/", include("blog.urls")),
    path('api/v2/', api_router.urls),
    path("polls/", include("polls.urls")),
    path('cms/', include(wagtailadmin_urls)),
    path('documents/', include(wagtaildocs_urls)),
    path('pages/', include(wagtail_urls)),
    re_path(r'^', include(wagtail_urls)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)