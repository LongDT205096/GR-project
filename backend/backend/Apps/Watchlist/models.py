from django.db import models

# Create your models here.
class Watchlist(models.Model):
    user = models.ForeignKey('Account.Account', on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.movie}'
