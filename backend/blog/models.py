from django.db import models

from wagtail.models import Page
from wagtail.fields import RichTextField
from wagtail.admin.panels import FieldPanel
from wagtail.search import index
from wagtail.models import Page, Orderable
from wagtail.fields import RichTextField
from wagtail.admin.panels import FieldPanel, InlinePanel
from wagtail.search import index
from wagtail.models import Page
from wagtail.fields import RichTextField
from wagtail.admin.panels import FieldPanel
from wagtail.search import index
from wagtail.rich_text import expand_db_html

from wagtail.fields import StreamField
from wagtail import blocks
from wagtail.images.blocks import ImageChooserBlock
from grapple.models import GraphQLString,GraphQLForeignKey,GraphQLCollection,GraphQLImage,GraphQLStreamfield
from modelcluster.fields import ParentalKey
from bs4 import BeautifulSoup

API_URL = 'http://localhost:8000'

class BlogIndexPage(Page):
    intro = RichTextField(blank=True)
    content_panels = Page.content_panels + [FieldPanel("intro")]
    graphql_fields = [
        GraphQLString("intro"),
    ]

class BlogPage(Page):
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

    def get_gallery_images(self):
        return self.gallery_images.all()
    
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
    
    graphql_fields = [
        GraphQLString("date"),
        GraphQLString("intro"),
        GraphQLString("html_body"),
        GraphQLCollection(
            GraphQLForeignKey,
            "gallery_images",
            "blog.BlogPageGalleryImage"
        ),
    ]

class DetailBlog(Page):
    date = models.DateField("Post date")
    intro = models.CharField(max_length=250)
    body = StreamField([
        ('person', blocks.StructBlock([
            ('first_name', blocks.CharBlock()),
            ('surname', blocks.CharBlock()),
            ('photo', ImageChooserBlock(required=False)),
            ('biography', blocks.RichTextBlock()),
        ])),
        ('heading', blocks.CharBlock(form_classname="title")),
        ('paragraph', blocks.RichTextBlock()),
        ('image', ImageChooserBlock()),
    ])
    
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

    def get_gallery_images(self):
        return self.gallery_images.all()
    
    search_fields = Page.search_fields + [
        index.SearchField("intro"),
        index.SearchField("body"),
    ]

    content_panels = Page.content_panels + [
        FieldPanel("intro"),
        FieldPanel("date"),
        FieldPanel("body"),
    ]
    
    graphql_fields = [
        GraphQLString("date"),
        GraphQLString("intro"),
        GraphQLString("heading"),
        GraphQLString("paragraph"),
        GraphQLImage("image"),
        GraphQLStreamfield("body"),
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

    graphql_fields = [
        GraphQLImage("image"),
        GraphQLString("caption"),
    ]


