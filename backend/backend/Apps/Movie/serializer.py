from rest_framework import serializers
from .models import Movie, Genre, MovieImage, MovieVideo, Movie_Actor, Movie_Genre
from ..Actor.models import Actor, ActorImage
from ..Director.models import Director
from ..Review.models import Review
from ..Rate.models import Rate


class MovieSerializer(serializers.ModelSerializer):
    genres = serializers.SerializerMethodField()
    director = serializers.SerializerMethodField()
    images = serializers.SerializerMethodField()
    trailer = serializers.SerializerMethodField()
    
    def get_genres(self, obj):
        genre_list = Movie_Genre.objects.filter(movie=obj)
        genres = [Genre.objects.get(id=genre.genre.id) for genre in genre_list]
        return [{
            "id": genre.id,
            "name": genre.name 
        } for genre in genres]
    
    def get_director(self, obj):
        return {"id": obj.director.id, "name": obj.director.name}

    def get_images(self, obj):
        images = {
            "logo": None,
            "poster": None,
            "backdrop": None
        }
        for image in obj.movieimage_set.all():
            if image.type in images:
                images[image.type] = image.image.url
        return images

    def get_trailer(self, obj):
        trailer = {
            "link": None,
        }
        for video in obj.movievideo_set.all():
            if video.type == "Trailer":
                trailer["link"] = video.link.url
                break
        return trailer
    
    class Meta:
        model = Movie
        fields = '__all__'


class MovieActorSerializer(serializers.ModelSerializer):
    actors = serializers.SerializerMethodField()
    
    def get_actors(self, obj):
        datas = Movie_Actor.objects.filter(movie=obj)[:10]
        actors = []
        for data in datas:
            actor = Actor.objects.get(id=data.actor.id)
            try:
                image = ActorImage.objects.filter(actor=actor)[:1].get().image.url
            except:
                image = None
            actors.append({
                "id": actor.id,
                "name": actor.name,
                "image": image,
                "character": data.character_name
            })
        return actors

    class Meta:
        model = Movie
        fields = '__all__'


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = '__all__'


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = MovieImage
        fields = '__all__'


class MovieImageSerializer(serializers.Serializer):
    backdrops = serializers.ListField(child=ImageSerializer())
    posters = serializers.ListField(child=ImageSerializer())
    logos = serializers.ListField(child=ImageSerializer())

    def to_representation(self, obj):
        images = MovieImage.objects.filter(movie=obj)
        backdrops = images.filter(type='backdrop')
        posters = images.filter(type='poster')
        logos = images.filter(type='logo')

        return {
            'backdrops': ImageSerializer(backdrops, many=True).data,
            'posters': ImageSerializer(posters, many=True).data,
            'logos': ImageSerializer(logos, many=True).data
        }


class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = MovieVideo
        fields = '__all__'


class MovieVideoSerializer(serializers.Serializer):
    Trailer = serializers.ListField(child=VideoSerializer())
    Teaser = serializers.ListField(child=VideoSerializer())

    def to_representation(self, obj):
        videos = MovieVideo.objects.filter(movie=obj)
        trailer = videos.filter(type='Trailer')
        teaser = videos.filter(type='Teaser')
        clips = videos.filter(type='Clips')
        behind_the_scene = videos.filter(type='Behind the Scene')
        bloopers = videos.filter(type='Bloopers')
        featurettes = videos.filter(type='Featurettes')
        opening_credits = videos.filter(type='Opening Credits')

        return {
            'trailer': VideoSerializer(trailer, many=True).data,
            'teaser': VideoSerializer(teaser, many=True).data,
            'clips': VideoSerializer(clips, many=True).data,
            'behind the Scene': VideoSerializer(behind_the_scene, many=True).data,
            'bloopers': VideoSerializer(bloopers, many=True).data,
            'featurettes': VideoSerializer(featurettes, many=True).data,
            'opening Credits': VideoSerializer(opening_credits, many=True).data
        }


class MovieBannerSerializer(serializers.ModelSerializer):
    images = serializers.SerializerMethodField()

    def get_images(self, obj):
        try:
            logo = MovieImage.objects.filter(movie=obj.id).filter(type='logo')[:1].get().image.url
        except:
            logo = None
        try:
            poster = MovieImage.objects.filter(movie=obj.id).filter(type='poster')[:1].get().image.url
        except:
            poster = None
        try:
            backdrop = MovieImage.objects.filter(movie=obj.id).filter(type='backdrop')[:1].get().image.url
        except:
            backdrop = None

        return {
            "logo": logo,   
            "poster": poster,
            "backdrop": backdrop
        }

    class Meta:
        model = Movie
        fields = ['id', 'title', 'release_date', 'original_country', 'ave_rate', 'summary', 'images']
