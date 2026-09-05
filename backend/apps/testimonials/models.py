from django.db import models


class Testimonial(models.Model):
    name = models.CharField(max_length=128)
    company = models.CharField(max_length=128)
    role = models.CharField(max_length=100, blank=True)
    avatar = models.ImageField(upload_to='testimonials/', null=True, blank=True)
    text = models.TextField()
    rating = models.PositiveSmallIntegerField(default=5)
    is_featured = models.BooleanField(default=False)
    order = models.PositiveSmallIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['order', '-created_at']

    def __str__(self):
        return f'{self.name} — {self.company}'
