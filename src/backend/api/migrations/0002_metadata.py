# Generated by Django 4.0 on 2022-02-26 19:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='MetaData',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('json', models.JSONField()),
                ('token', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.token')),
            ],
        ),
    ]
