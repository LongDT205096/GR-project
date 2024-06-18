from django.db import models

# Create your models here.
class Watchlist(models.Model):
    account = models.ForeignKey('Account.Account', on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.account}'

class Watchlist_Movie(models.Model):
    watchlist = models.ForeignKey(Watchlist, on_delete=models.CASCADE)
    movie = models.ForeignKey('Movie.Movie', on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.movie}'
