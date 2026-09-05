from django.db import models
from utils.models import SingletonModel


class Hero(SingletonModel):
    heading = models.CharField(max_length=200, default='We Build Digital Excellence')
    subheading = models.TextField(blank=True)
    background_image = models.ImageField(upload_to='hero/', null=True, blank=True)
    button_text = models.CharField(max_length=50, blank=True, default='Get Started')
    button_link = models.CharField(max_length=200, blank=True, default='/contact')
    animated_words = models.JSONField(
        default=list, blank=True,
        help_text='List of words/phrases to animate/rotate in the hero heading',
    )
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Hero Section'
        verbose_name_plural = 'Hero Section'

    def __str__(self):
        return self.heading


class HeroStat(models.Model):
    hero = models.ForeignKey(Hero, on_delete=models.CASCADE, related_name='statistics')
    label = models.CharField(max_length=100)
    value = models.CharField(max_length=30, help_text="e.g. '150+', '99%'")
    order = models.PositiveSmallIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f'{self.value} {self.label}'
