# Generated by Django 5.0.4 on 2024-04-14 19:46

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
                ('name', models.CharField(choices=[('Action', 'Action'), ('Adventure', 'Adventure'), ('Comedy', 'Comedy'), ('Drama', 'Drama'), ('Fantasy', 'Fantasy'), ('Historical', 'Historical'), ('Horror', 'Horror'), ('Mystery', 'Mystery'), ('Philosophical', 'Philosophical'), ('Political', 'Political'), ('Romance', 'Romance'), ('Science Fiction', 'Science Fiction'), ('Thriller', 'Thriller'), ('Western', 'Western')], max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Movie',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50)),
                ('release_date', models.DateField()),
                ('duration', models.IntegerField()),
                ('rate', models.FloatField()),
                ('actors', models.ManyToManyField(to='Actor.actor')),
                ('director', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Director.director')),
                ('genres', models.ManyToManyField(to='Movie.genre')),
            ],
        ),
    ]