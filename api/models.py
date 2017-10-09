from django.contrib.gis.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.contrib.gis.measure import Distance
from django.contrib.gis.geos import Point




class User(AbstractUser):
    username = models.TextField(primary_key=True, unique=True)
    official = models.BooleanField(default=False)
    USERNAME_FIELD = 'username'


class Issue(models.Model):
    name = models.TextField()
    desc = models.TextField()
    #TODO Update this field so that we can use real-world distances and not geometries.
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
    author = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='votes', null=True, on_delete=models.SET_NULL)
    issue = models.ForeignKey(Issue, related_name='votes', null=True, on_delete=models.SET_NULL)


class Comment(models.Model):
    body = models.TextField()
    author = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='comments', null=True, on_delete=models.SET_NULL)
    issue = models.ForeignKey(Issue, related_name='comments', null=True, on_delete=models.SET_NULL)


class Report(models.Model):
    body = models.TextField()
    author = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='reports', null=True, on_delete=models.SET_NULL)
    issue = models.ForeignKey(Issue, related_name='reports', null=True, on_delete=models.SET_NULL)
