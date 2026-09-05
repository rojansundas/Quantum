from django.db import models


class TeamMember(models.Model):
    name = models.CharField(max_length=120)
    position = models.CharField(max_length=120)
    photo = models.ImageField(upload_to='team/', null=True, blank=True)
    bio = models.TextField(blank=True)

    facebook = models.URLField(blank=True)
    linkedin = models.URLField(blank=True)
    instagram = models.URLField(blank=True)
    github = models.URLField(blank=True)

    order = models.PositiveSmallIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', 'name']
        verbose_name = 'Team Member'
        verbose_name_plural = 'Team Members'

    def __str__(self):
        return f'{self.name} — {self.position}'
