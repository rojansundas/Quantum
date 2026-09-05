from django.db import models


class Service(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    icon = models.CharField(max_length=10)
    short_desc = models.CharField(max_length=300)
    description = models.TextField()
    technologies = models.JSONField(default=list)
    features = models.JSONField(default=list)
    order = models.PositiveSmallIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title
