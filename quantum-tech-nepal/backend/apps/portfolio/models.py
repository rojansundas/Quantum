from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=64)
    slug = models.SlugField(unique=True)
    class Meta: ordering = ['name']
    def __str__(self): return self.name


class Project(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name='projects')
    description = models.TextField()
    thumbnail = models.ImageField(upload_to='portfolio/')
    live_url = models.URLField(blank=True)
    github_url = models.URLField(blank=True)
    technologies = models.JSONField(default=list)
    featured = models.BooleanField(default=False)
    order = models.PositiveSmallIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', '-created_at']
        indexes = [models.Index(fields=['slug']), models.Index(fields=['featured'])]

    def __str__(self): return self.title
