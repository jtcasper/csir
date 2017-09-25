from django.contrib.gis.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings

class User(AbstractUser):
    username = models.TextField(primary_key=True, unique=True)
    official = models.BooleanField(default=False)
    USERNAME_FIELD = 'username'

class Issue(models.Model):
    name = models.TextField()
    desc = models.TextField()
    location = models.PointField(null=True, blank=True)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='i_author', null=True, on_delete=models.SET_NULL)
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
    author = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='v_author', null=True, on_delete=models.SET_NULL)
    issue = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='v_issue', null=True, on_delete=models.SET_NULL)

class Comment(models.Model):
    body = models.TextField()
    author = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='c_author', null=True, on_delete=models.SET_NULL)
    issue = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='c_issue', null=True, on_delete=models.SET_NULL)

class Report(models.Model):
    body = models.TextField()
    author = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='r_author', null=True, on_delete=models.SET_NULL)
    issue = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='r_issue', null=True, on_delete=models.SET_NULL)
