# Generated by Django 5.0.4 on 2024-05-21 10:30

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("Director", "0003_alter_director_name_alter_director_place_of_birth"),
    ]

    operations = [
        migrations.AlterField(
            model_name="director",
            name="name",
            field=models.CharField(max_length=50),
        ),
        migrations.AlterField(
            model_name="director",
            name="place_of_birth",
            field=models.CharField(max_length=50),
        ),
    ]
