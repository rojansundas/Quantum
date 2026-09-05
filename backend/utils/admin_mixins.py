from django.utils.html import format_html


class ImagePreviewMixin:
    """
    Adds thumbnail preview methods for admin list_display / readonly_fields.
    Usage: list the field name (e.g. 'logo') in `image_preview_fields` and
    reference '<field>_preview' in list_display / readonly_fields.
    """
    image_preview_fields = ()

    def __getattr__(self, name):
        if name.endswith('_preview'):
            field_name = name[: -len('_preview')]
            if field_name in self.image_preview_fields:
                def _preview(obj, field_name=field_name):
                    image = getattr(obj, field_name, None)
                    if image:
                        try:
                            url = image.url
                        except ValueError:
                            return '—'
                        return format_html(
                            '<img src="{}" style="height:48px;width:48px;'
                            'object-fit:cover;border-radius:6px;" />',
                            url,
                        )
                    return '—'
                _preview.short_description = field_name.replace('_', ' ').title()
                return _preview
        raise AttributeError(name)


class SingletonAdminMixin:
    """
    Restricts a model admin to a single row: hides "Add" once one exists,
    and blocks deletion so the settings/hero/about row can't be removed.
    """

    def has_add_permission(self, request):
        return not self.model.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False
