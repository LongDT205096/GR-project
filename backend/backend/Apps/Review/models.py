from django.db import models

from ..Account.models import Account
from ..Movie.models import Movie


# Create your models here.
class Review(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    review = models.TextField(max_length=2000, blank=True)
    spoiled = models.BooleanField(default=False)
