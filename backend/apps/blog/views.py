from rest_framework import viewsets, permissions, generics, filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import Post, Tag
from .serializers import PostListSerializer, PostDetailSerializer, TagSerializer

class PostViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Post.objects.filter(status='published').prefetch_related('tags').select_related('author')
    permission_classes = [permissions.AllowAny]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['tags__slug']
    search_fields = ['title', 'excerpt', 'content']
    lookup_field = 'slug'

    def get_serializer_class(self):
        return PostDetailSerializer if self.action == 'retrieve' else PostListSerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        Post.objects.filter(pk=instance.pk).update(views=instance.views + 1)
        return super().retrieve(request, *args, **kwargs)

class TagViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [permissions.AllowAny]
    lookup_field = 'slug'
