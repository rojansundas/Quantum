from django.core.cache import cache
from django.db import models


class SingletonModel(models.Model):
    """
    Abstract base for models that should only ever have one row
    (e.g. SiteSettings, Hero, About). Always saves to pk=1 and caches
    the instance so repeated `load()` calls don't hit the DB every time.
    """

    class Meta:
        abstract = True

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)
        cache.set(self._cache_key(), self, timeout=60 * 60)

    def delete(self, *args, **kwargs):
        pass  # singleton rows are never deleted

    @classmethod
    def _cache_key(cls):
        return f'singleton:{cls.__name__}'

    @classmethod
    def load(cls):
        cached = cache.get(cls._cache_key())
        if cached is not None:
            return cached
        obj, _ = cls.objects.get_or_create(pk=1)
        cache.set(cls._cache_key(), obj, timeout=60 * 60)
        return obj
