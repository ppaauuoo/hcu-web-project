from django.db import models

import graphene
from wagtail.fields import RichTextField, StreamField
from modelcluster.fields import ParentalKey, ParentalManyToManyField
from wagtail.admin.panels import FieldPanel, InlinePanel, MultiFieldPanel
from wagtail.search import index
from wagtail.models import Page, Orderable
from wagtail.rich_text import expand_db_html
from modelcluster.contrib.taggit import ClusterTaggableManager


from grapple.models import (
    GraphQLString,
    GraphQLForeignKey,
    GraphQLCollection,
    GraphQLImage,
    GraphQLTag,
    GraphQLStreamfield,
)
from wagtail import blocks
from wagtail.images.blocks import ImageChooserBlock

from modelcluster.fields import ParentalKey
from bs4 import BeautifulSoup
from taggit.models import TaggedItemBase
from django import forms
from wagtail.snippets.models import register_snippet
from grapple.helpers import register_streamfield_block,register_query_field

API_URL = "http://localhost:8000"


class Utils():
    @staticmethod
    def get_api_representation(value):
        soup = BeautifulSoup(expand_db_html(value), "html.parser")
        for img in soup.find_all("img"):
            src = img["src"]
            # Modify the src to include apiurl
            apiurl = f"{API_URL}{src}"
            img["src"] = apiurl
        return str(soup)
@register_snippet
class Author(models.Model):
    name = models.CharField(max_length=255)
    author_image = models.ForeignKey(
        "wagtailimages.Image",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
    )

    panels = [
        FieldPanel("name"),
        FieldPanel("author_image"),
    ]

    graphql_fields = [
        GraphQLString("name"),
        GraphQLImage("author_image"),
    ]

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = "Authors"



class BlogIndexPage(Page):
    intro = RichTextField(blank=True)
    content_panels = Page.content_panels + [FieldPanel("intro")]

    def get_context(self, request):
        # Update context to include only published posts, ordered by reverse-chron
        context = super().get_context(request)
        blogpages = self.get_children().live().order_by("-first_published_at")
        context["blogpages"] = blogpages
        return context

    graphql_fields = [
        GraphQLString("intro"),
    ]


class BlogPageTag(TaggedItemBase):
    content_object = ParentalKey(
        "BlogPage", related_name="tagged_items", on_delete=models.CASCADE
    )


class BlogTagIndexPage(Page):

    def get_context(self, request):

        # Filter by tag
        tag = request.GET.get("tag")
        blogpages = BlogPage.objects.filter(tags__name=tag)

        # Update template context
        context = super().get_context(request)
        context["blogpages"] = blogpages
        return context


@register_query_field(
    "blogpage"
)
class BlogPage(Page):
    date = models.DateField("Post date")
    intro = models.CharField(max_length=250)
    body = RichTextField(blank=True)
    authors = ParentalManyToManyField("blog.Author", blank=True)

    # Add this:
    tags = ClusterTaggableManager(through=BlogPageTag, blank=True)

    @property
    def html_body(self):
        return Utils.get_api_representation(self.body)

    search_fields = Page.search_fields + [
        index.SearchField("intro"),
        index.SearchField("body"),
        index.SearchField("tags"),
    ]

    content_panels = Page.content_panels + [
        MultiFieldPanel(
            [
                FieldPanel("date"),
                FieldPanel("authors", widget=forms.CheckboxSelectMultiple),
                # Add this:
                FieldPanel("tags"),
            ],
            heading="Blog information",
        ),
        FieldPanel("intro"),
        FieldPanel("body"),
        InlinePanel("gallery_images", label="Gallery images"),
    ]

    graphql_fields = [
        GraphQLTag("tags"),
        GraphQLString("date"),
        GraphQLCollection(GraphQLForeignKey, "authors", "blog.Author"),
        GraphQLString("intro"),
        GraphQLString("html_body"),
        GraphQLCollection(
            GraphQLForeignKey, "gallery_images", "blog.BlogPageGalleryImage"
        ),
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

@register_streamfield_block
class PersonBlock(blocks.StructBlock):
    firstname = blocks.CharBlock()
    surname = blocks.CharBlock()
    photo = ImageChooserBlock(required=False)
    biography = blocks.RichTextBlock()

    @property
    def html_biography(self):
        return Utils.get_api_representation(self.biography)
    
    graphql_fields = [
        GraphQLString("firstname"),
        GraphQLString("surname"),
        GraphQLImage("photo"),
        GraphQLString("biography"),
    ]


@register_streamfield_block
class DetailBlock(blocks.StructBlock):
    heading = blocks.CharBlock(form_classname="title")
    paragraph = blocks.RichTextBlock()

    @property
    def html_paragraph(self):
        return Utils.get_api_representation(self.paragraph)

    graphql_fields = [
        GraphQLString("heading"),
        GraphQLString("paragraph"),
       
    ]

@register_query_field(
    "detailpage"
)
class DetailBlog(Page):
    date = models.DateField("Post date")
    intro = models.CharField(max_length=250)
    body = StreamField(
        [
            ("person", PersonBlock()),
            ("detail", DetailBlock()),
            ('image', ImageChooserBlock()),
        ]
    )

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
        GraphQLStreamfield("body"),
    ]
