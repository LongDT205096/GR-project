from django.db import models

# Create your models here.
class Actor(models.Model):
    name = models.CharField(max_length=50)
    birthday = models.DateField(null=True, blank=True)
    deathday = models.DateField(null=True, blank=True)
    place_of_birth = models.CharField(max_length=50)
    biography = models.TextField(null=True, blank=True)
    image = models.ImageField(upload_to="actor/", blank=True, null=True)

    def __str__(self) -> str:
        return f"{self.name}"


class ActorImage(models.Model):
    image = models.ImageField(upload_to="actor/", blank=True, null=True)
    actor = models.ForeignKey(Actor, on_delete=models.CASCADE)