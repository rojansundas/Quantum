from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import HttpResponse
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView


def home(request):
    return HttpResponse("Quantum Tech Nepal Backend API is running successfully 🚀")


urlpatterns = [
    path("", home),   # <-- Add this

    path("admin/", admin.site.urls),
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path("api/docs/", SpectacularSwaggerView.as_view(url_name="schema"), name="swagger-ui"),
    path("api/v1/auth/", include("apps.users.urls")),
    path("api/v1/services/", include("apps.services.urls")),
    path("api/v1/portfolio/", include("apps.portfolio.urls")),
    path("api/v1/blog/", include("apps.blog.urls")),
    path("api/v1/careers/", include("apps.careers.urls")),
    path("api/v1/contact/", include("apps.contact.urls")),
    path("api/v1/testimonials/", include("apps.testimonials.urls")),
    path("api/v1/team/", include("apps.team.urls")),
    path("api/v1/service-inquiry/", include("apps.serviceinquiry.urls")),
    path("social-auth/", include("social_django.urls", namespace="social")),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)