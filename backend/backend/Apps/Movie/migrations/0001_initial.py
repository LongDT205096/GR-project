# Generated by Django 5.0.4 on 2024-05-03 18:38

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('Actor', '0001_initial'),
        ('Director', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Genre',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(choices=[('Action', 'Action'), ('Adventure', 'Adventure'), ('Animation', 'Animation'), ('Biography', 'Biography'), ('Comedy', 'Comedy'), ('Crime', 'Crime'), ('Documentary', 'Documentary'), ('Drama', 'Drama'), ('Family', 'Family'), ('Fantasy', 'Fantasy'), ('Film-Noir', 'Film-Noir'), ('Game-Show', 'Game-Show'), ('History', 'History'), ('Horror', 'Horror'), ('Music', 'Music'), ('Musical', 'Musical'), ('Mystery', 'Mystery'), ('News', 'News'), ('Reality-TV', 'Reality-TV'), ('Romance', 'Romance'), ('Sci-Fi', 'Sci-Fi'), ('Short', 'Short'), ('Sport', 'Sport'), ('Talk-Show', 'Talk-Show'), ('Thriller', 'Thriller'), ('War', 'War'), ('Western', 'Western')], max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Movie',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50)),
                ('release_date', models.DateField()),
                ('duration', models.IntegerField()),
                ('ave_rate', models.FloatField(default=0.0)),
                ('summary', models.CharField(blank=True, max_length=2000, null=True)),
                ('synopsis', models.TextField(blank=True, max_length=15000, null=True)),
                ('actors', models.ManyToManyField(to='Actor.actor')),
                ('director', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Director.director')),
                ('genres', models.ManyToManyField(to='Movie.genre')),
            ],
        ),
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(blank=True, null=True, upload_to='')),
                ('movie', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Movie.movie')),
            ],
        ),
        migrations.CreateModel(
            name='Trailer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50)),
                ('link', models.FileField(blank=True, null=True, upload_to='')),
                ('type', models.CharField(choices=[('Trailers', 'Trailers'), ('Teasers', 'Teasers'), ('Clips', 'Clips'), ('Behind the Scene', 'Behind the Scene'), ('Bloopers', 'Bloopers'), ('Featurettes', 'Featurettes'), ('Opening Credits', 'Opening Credits')], max_length=50)),
                ('movie', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Movie.movie')),
            ],
        ),
    ]
