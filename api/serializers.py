from django.contrib.auth import get_user_model
from rest_framework import serializers

from api.models import *


class IssueSerializer(serializers.ModelSerializer):
    reports = serializers.HyperlinkedRelatedField(many=True, read_only=True, view_name='report-detail')
    votes = serializers.HyperlinkedRelatedField(many=True, read_only=True, view_name='vote-detail')
    comments = serializers.HyperlinkedRelatedField(many=True, read_only=True,
                                                   view_name='issue-detail')

    class Meta:
        model = Issue
        fields = (
            'name', 'desc', 'lat', 'lng', 'location', 'author', 'created_at', 'modified_at', 'comments', 'votes',
            'reports')
        read_only_fields = ('location', 'created_at', 'modified_at', 'comments', 'votes', 'reports')

    def create(self, validated_data):
        issue = Issue.objects.create(
            name=validated_data['name'],
            desc=validated_data['desc'],
            author=validated_data['author'],
            lat=validated_data['lat'],
            lng=validated_data['lng'],
            location='POINT(' + str(validated_data['lat']) + ' ' + str(validated_data['lng']) + ')'
        )
        issue.save()
        return issue


UserModel = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    issues = serializers.HyperlinkedRelatedField(many=True, read_only=True, view_name='issue-detail')
    reports = serializers.HyperlinkedRelatedField(many=True, read_only=True, view_name='report-detail')
    votes = serializers.HyperlinkedRelatedField(many=True, read_only=True, view_name='vote-detail')
    comments = serializers.HyperlinkedRelatedField(many=True, read_only=True,
                                                   view_name='comment-detail')

    def create(self, validated_data):
        user = UserModel.objects.create(
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            username=validated_data['username'],
            email=validated_data['email'],
            official=validated_data['official']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

    class Meta:
        model = UserModel
        fields = ('first_name', 'last_name', 'username', 'password', 'email', 'official', 'comments', 'issues', 'votes',
                  'reports')
        extra_kwargs = {
            'password': {'write_only': True, 'style': {'input_type': 'password'}}
        }


class VoteSerializer(serializers.ModelSerializer):
    vote = serializers.ChoiceField(choices=Vote.VOTE_CHOICES, allow_blank=False)
    issue = serializers.HyperlinkedRelatedField(many=False, queryset=Issue.objects.all(), view_name='issue-detail')
    author = serializers.HyperlinkedRelatedField(many=False, queryset=UserModel.objects.all(), view_name='user-detail')

    class Meta:
        model = Vote
        fields = ('vote', 'author', 'issue')


class CommentSerializer(serializers.ModelSerializer):
    issue = serializers.HyperlinkedRelatedField(many=False, queryset=Issue.objects.all(), view_name='issue-detail')
    author = serializers.HyperlinkedRelatedField(many=False, queryset=UserModel.objects.all(), view_name='user-detail')

    class Meta:
        model = Comment
        fields = ('body', 'author', 'issue')


class ReportSerializer(serializers.ModelSerializer):
    issue = serializers.HyperlinkedRelatedField(many=False, queryset=Issue.objects.all(), view_name='issue-detail')
    author = serializers.HyperlinkedRelatedField(many=False, queryset=UserModel.objects.all(), view_name='user-detail')

    class Meta:
        model = Report
        fields = ('body', 'author', 'issue')
