from django.db import models

# Add these:
from grapple.models import GraphQLString
from wagtail.models import Page
from wagtail.fields import RichTextField
from wagtail.admin.panels import FieldPanel
from wagtail.search import index

from modelcluster.fields import ParentalKey

from wagtail.models import Page, Orderable
from wagtail.fields import RichTextField
from wagtail.admin.panels import FieldPanel, InlinePanel
from wagtail.search import index
from django.db import models
from wagtail.models import Page
from wagtail.fields import RichTextField
from wagtail.admin.panels import FieldPanel
from wagtail.search import index
from wagtail.api import APIField
from wagtail.rich_text import expand_db_html
from wagtail_headless_preview.models import HeadlessMixin

from bs4 import BeautifulSoup

API_URL = 'http://localhost:8000'

class BlogIndexPage(HeadlessMixin,Page):
    intro = RichTextField(blank=True)
    content_panels = Page.content_panels + [FieldPanel("intro")]

class BlogPage(HeadlessMixin,Page):
    date = models.DateField("Post date")
    intro = models.CharField(max_length=250)
    # body = StreamField([
    #     ('paragraph', RichTextBlock()),
    #     ('image', ImageChooserBlock()),
    # ])
    body = RichTextField(blank=True)
    
    def get_api_representation(self, value):
        # Use BeautifulSoup to modify image src
        soup = BeautifulSoup(expand_db_html(value), 'html.parser')
        for img in soup.find_all('img'):
            src = img['src']
            # Modify the src to include apiurl
            apiurl = f"{API_URL}{src}"
            img['src'] = apiurl
        return str(soup)
    
    @property
    def html_body(self):
        return self.get_api_representation(self.body)

    search_fields = Page.search_fields + [
        index.SearchField("intro"),
        index.SearchField("body"),
    ]

    content_panels = Page.content_panels + [
        FieldPanel("date"),
        FieldPanel("intro"),
        FieldPanel("body"),
        InlinePanel("gallery_images", label="Gallery images"),
    ]
    
    api_fields = [
        APIField('date'),
        APIField('intro'),
        APIField('html_body'),
        APIField('gallery_images'),
    ]

    graphql_fields = [
        GraphQLString("date"),
        GraphQLString("intro"),
        GraphQLString("html_body"),
        GraphQLString("gallery_images"),
    ]

class BlogPageGalleryImage(Orderable):
    page = ParentalKey(
        BlogPage, on_delete=models.CASCADE, related_name="gallery_images"
    )
    image = models.ForeignKey(
        "wagtailimages.Image", on_delete=models.CASCADE, related_name="+"
    )
    caption = models.CharField(blank=True, max_length=250)

    panels = [
        FieldPanel("image"),
        FieldPanel("caption"),
    ]

    api_fields = [
        APIField('image'),
        APIField('caption'),
    ]
    
    graphql_fields = [
        GraphQLString("image"),
        GraphQLString("caption"),
    ]


