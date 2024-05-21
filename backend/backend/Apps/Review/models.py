from django.db import models
from vote.models import VoteModel
from ..Account.models import Account
from ..Movie.models import Movie


# Create your models here.
class Review(VoteModel, models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    content = models.TextField(max_length=2000, blank=True)
    spoiled = models.BooleanField(default=False)
