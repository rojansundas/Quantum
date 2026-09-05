from django.db import models
from utils.models import SingletonModel


class About(SingletonModel):
    mission = models.TextField(blank=True)
    vision = models.TextField(blank=True)
    story = models.TextField(blank=True, help_text='Company story / history')
    ceo_message = models.TextField(blank=True)
    ceo_name = models.CharField(max_length=120, blank=True)
    ceo_photo = models.ImageField(upload_to='about/', null=True, blank=True)
    cover_image = models.ImageField(upload_to='about/', null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'About Page'
        verbose_name_plural = 'About Page'

    def __str__(self):
        return 'About Page Content'


class AboutImage(models.Model):
    """Gallery images shown on the About page."""
    about = models.ForeignKey(About, on_delete=models.CASCADE, related_name='gallery')
    image = models.ImageField(upload_to='about/gallery/')
    caption = models.CharField(max_length=150, blank=True)
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.caption or f'Image {self.pk}'


class TimelineItem(models.Model):
    about = models.ForeignKey(About, on_delete=models.CASCADE, related_name='timeline')
    year = models.CharField(max_length=10)
    title = models.CharField(max_length=150)
    description = models.TextField(blank=True)
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f'{self.year} — {self.title}'


class Achievement(models.Model):
    about = models.ForeignKey(About, on_delete=models.CASCADE, related_name='achievements')
    title = models.CharField(max_length=150)
    value = models.CharField(max_length=30, help_text="e.g. '50+', '10 Years'")
    icon = models.CharField(max_length=10, blank=True, help_text='Emoji or icon key')
    order = models.PositiveSmallIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f'{self.value} {self.title}'
