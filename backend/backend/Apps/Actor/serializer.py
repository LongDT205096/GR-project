from rest_framework import serializers
from .models import Actor, ActorImage
from ..Movie.models import Movie, Movie_Actor, MovieImage

class ActorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Actor
        fields = '__all__'


class ActorMovieSerializer(serializers.ModelSerializer):
    images = serializers.SerializerMethodField()

    def get_images(self, obj):
        try:
            poster = MovieImage.objects.filter(movie=obj, type="poster")[:1].get().image.url
        except:
            poster = None
        return {
            'poster': poster
        }

    class Meta:
        model = Movie
        fields = ('id', 'title', 'release_date', 'ave_rate', 'images')


class ActorImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActorImage
        fields = '__all__'
