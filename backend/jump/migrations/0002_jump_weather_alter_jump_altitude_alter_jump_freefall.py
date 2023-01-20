# Generated by Django 4.0.4 on 2023-01-20 20:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jump', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='jump',
            name='weather',
            field=models.CharField(default='hello', max_length=100),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='jump',
            name='altitude',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='jump',
            name='freefall',
            field=models.IntegerField(),
        ),
    ]