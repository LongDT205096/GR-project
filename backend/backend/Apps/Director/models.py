from django.db import models

# Create your models here.
class Director(models.Model):
    name = models.CharField(max_length=50)
    birthday = models.DateField(null=True, blank=True)
    deathday = models.DateField(null=True, blank=True)
    place_of_birth = models.CharField(max_length=50)
    biography = models.TextField(null=True, blank=True)
    poster = models.URLField(max_length=500, null=True, blank=True)

    def __str__(self) -> str:
        return f"{self.first_name} {self.last_name}"
