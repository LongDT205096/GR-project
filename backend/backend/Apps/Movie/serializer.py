from rest_framework import serializers
from .models import Movie, Genre, MovieImage, MovieVideo
from ..Actor.models import Actor
from ..Director.models import Director
from ..Review.models import Review


class MovieSerializer(serializers.ModelSerializer):
    actors = serializers.SerializerMethodField()
    genres = serializers.SerializerMethodField()
    director = serializers.SerializerMethodField()
    reviews = serializers.SerializerMethodField()
    images = serializers.SerializerMethodField()
    videos = serializers.SerializerMethodField()

    def get_actors(self, obj):
        actors = Actor.objects.filter(movie=obj)
        return [{
            "id": actor.id,
            "name": actor.name
        } for actor in actors]
    
    def get_genres(self, obj):
        genres = Genre.objects.filter(movie=obj)
        return [{
            "id": genre.id,
            "name": genre.name 
        } for genre in genres]
    
    def get_reviews(self, obj):
        reviews = Review.objects.filter(movie=obj)
        return [{
            "id": review.id,
            "title": review.title,
            "content":review.content
        } for review in reviews]

    def get_director(self, obj):
        director = Director.objects.get(movie=obj)
        return {"id": director.id, "name": director.name}

    def get_images(self, obj):
        images = MovieImage.objects.filter(movie=obj)
        return [{
            "id": image.id,
            "image": image.image.url,
            "type": image.type
        } for image in images]

    def get_videos(self, obj):
        videos = MovieVideo.objects.filter(movie=obj)
        return [{
            "id": video.id,
            "title": video.title,
            "link": video.link.url,
            "type": video.type
        } for video in videos]

    class Meta:
        model = Movie
        fields = '__all__'


class MovieBannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ['id', 'title', 'release_date', 'ave_rate']


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = '__all__'
