# Generated by Django 5.0.4 on 2024-05-13 04:57

import django_countries.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Movie', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='movie',
            name='budget',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='movie',
            name='original_country',
            field=django_countries.fields.CountryField(blank=True, max_length=2),
        ),
        migrations.AddField(
            model_name='movie',
            name='revenue',
            field=models.IntegerField(default=0),
        ),
    ]