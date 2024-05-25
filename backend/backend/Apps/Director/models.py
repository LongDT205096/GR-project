from django.db import models

# Create your models here.
class Director(models.Model):
    name = models.CharField(max_length=50)
    birthday = models.DateField(null=True, blank=True)
    deathday = models.DateField(null=True, blank=True)
    place_of_birth = models.CharField(null=True, blank=True, max_length=50)
    biography = models.TextField(null=True, blank=True)

    def __str__(self) -> str:
        return f"{self.name}"


class DirectorImage(models.Model):
    director = models.ForeignKey(Director, on_delete=models.CASCADE)
    image = models.ImageField(upload_to="director/", blank=True, null=True)
