from django.db import models

from ..Account.models import Account
from ..Movie.models import Movie


# Create your models here.
class Rate(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    rate = models.IntegerField(default=0)
