from django.db import models

# Create your models here.
class Director(models.Model):
    name = models.CharField(max_length=50)
    birth_date = models.DateField()
    birth_place = models.CharField(max_length=50)
    bio = models.TextField()
    poster = models.URLField(max_length=500, null=True, blank=True)

    def __str__(self) -> str:
        return f"{self.first_name} {self.last_name}"
