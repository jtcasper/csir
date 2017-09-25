from rest_framework import serializers

from api.models import *


class IssueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Issue
        fields = ('id', 'name', 'desc', 'location', 'author', 'created_at', 'modified_at')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'username', 'password', 'email', 'official')

class VoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vote
        fields = ('vote', 'author', 'issue')

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('body', 'author', 'issue')

class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = Report
        fields = ('body', 'author', 'issue')
