from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.contrib.gis.db import models


class User(AbstractUser):
    username = models.TextField(primary_key=True, unique=True)
    email = models.EmailField(blank=False, unique=True)
    first_name = models.TextField(blank=False)
    last_name = models.TextField(blank=False)
    official = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)
    USERNAME_FIELD = 'username'

    def __str__(self):
        return self.username


class Issue(models.Model):
    name = models.TextField(blank=False)
    desc = models.TextField(blank=False, verbose_name="Description")
    lng = models.FloatField(blank=False, verbose_name="Longitude")
    lat = models.FloatField(blank=False, verbose_name="Latitude")
    location = models.PointField(null=True, blank=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='issues', null=True, on_delete=models.SET_NULL)
    created_at = models.DateTimeField(auto_now_add=True)
    modified_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Vote(models.Model):
    VOTE_UP = 'U'
    VOTE_MIDDLE = 'M'
    VOTE_DOWN = 'D'
    VOTE_CHOICES = (
        (VOTE_UP, 'Up vote'),
        (VOTE_MIDDLE, 'No vote'),
        (VOTE_DOWN, 'Down vote'),
    )

    vote = models.CharField(max_length=1, choices=VOTE_CHOICES, default=VOTE_MIDDLE)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='votes', on_delete=models.CASCADE)
    issue = models.ForeignKey(Issue, related_name='votes', on_delete=models.CASCADE)


class Comment(models.Model):
    body = models.TextField(blank=False)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='comments', on_delete=models.CASCADE)
    issue = models.ForeignKey(Issue, related_name='comments', on_delete=models.CASCADE)


class Report(models.Model):
    body = models.TextField(blank=False)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='reports', on_delete=models.CASCADE)
    issue = models.ForeignKey(Issue, related_name='reports', on_delete=models.CASCADE)
