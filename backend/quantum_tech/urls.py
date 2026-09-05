from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

urlpatterns = [
    # Admin
    path('admin/', admin.site.urls),
    # API Schema & Docs
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    # App APIs
    path('api/v1/auth/', include('apps.users.urls')),
    path('api/v1/services/', include('apps.services.urls')),
    path('api/v1/portfolio/', include('apps.portfolio.urls')),
    path('api/v1/blog/', include('apps.blog.urls')),
    path('api/v1/contact/', include('apps.contact.urls')),
    path('api/v1/careers/', include('apps.careers.urls')),
    # Social auth
    path('social-auth/', include('social_django.urls', namespace='social')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
