from django.apps import AppConfig
from .utils import recommend
from . import cache

class RecommendationConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "Apps.Recommendation"
    
    def ready(self):
        cache.recommendations = recommend()
