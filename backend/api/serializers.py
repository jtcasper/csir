from django.contrib.auth import get_user_model
from rest_framework import serializers
from django.db.models import Count

from api.models import *


UserModel = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    detail = serializers.HyperlinkedIdentityField(
        view_name='user-detail', format='html')
    issues = serializers.HyperlinkedRelatedField(
        many=True, read_only=True, view_name='issue-detail')
    reports = serializers.HyperlinkedIdentityField(
        view_name='user-reports', format='html')
    votes = serializers.HyperlinkedIdentityField(
        view_name='user-votes', format='html')
    comments = serializers.HyperlinkedIdentityField(
        view_name='user-comments', format='html')

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
        fields = ('detail', 'first_name', 'last_name', 'username', 'password', 'email', 'official', 'issues', 'comments', 'votes',
                  'reports')
        extra_kwargs = {
            'password': {'write_only': True, 'style': {'input_type': 'password'}}
        }


class VoteSerializer(serializers.ModelSerializer):
    detail = serializers.HyperlinkedIdentityField(
        view_name='vote-detail', format='html')
    vote = serializers.ChoiceField(
        choices=Vote.VOTE_CHOICES, allow_blank=False)

    class Meta:
        model = Vote
        fields = ('detail', 'id', 'vote', 'author', 'issue')
        read_only_fields = ('id', 'author')

    def create(self, validated_data):

        author = validated_data['author']
        issue = validated_data['issue']

        if(isinstance(issue, Issue)):
            issue = issue.id

        val = validated_data['vote']

        obj, created = Vote.objects.update_or_create(author_id=author, issue_id=issue, defaults={'vote': val})

        return obj


class CommentSerializer(serializers.ModelSerializer):
    detail = serializers.HyperlinkedIdentityField(
        view_name='comment-detail', format='html')
    issue = serializers.HyperlinkedRelatedField(
        many=False, queryset=Issue.objects.all(), view_name='issue-detail')
    author = serializers.HyperlinkedRelatedField(
        many=False, view_name='user-detail', read_only=True)

    class Meta:
        model = Comment
        fields = ('detail', 'id', 'body', 'author', 'issue')
        read_only_fields = ('id', 'author')


class ReportSerializer(serializers.ModelSerializer):
    detail = serializers.HyperlinkedIdentityField(
        view_name='report-detail', format='html')
    issue = serializers.HyperlinkedRelatedField(
        many=False, queryset=Issue.objects.all(), view_name='issue-detail')
    author = serializers.HyperlinkedRelatedField(
        many=False, view_name='user-detail', read_only=True)

    class Meta:
        model = Report
        fields = ('detail', 'id', 'body', 'author', 'issue')
        read_only_fields = ('id', 'author')


class IssueSerializer(serializers.ModelSerializer):
    detail = serializers.HyperlinkedIdentityField(
        view_name='issue-detail', format='html')
    reports = serializers.HyperlinkedIdentityField(
        view_name='issue-reports', format='html')
    votes = serializers.HyperlinkedIdentityField(
        view_name='issue-votes', format='html')
    comments = serializers.HyperlinkedIdentityField(
        view_name='issue-comments', format='html')
    importance = serializers.IntegerField(read_only=True)

    class Meta:
        model = Issue
        fields = ('detail', 'id', 'name', 'desc', 'lat', 'lng', 'location', 'author',
                  'created_at', 'modified_at', 'comments', 'votes', 'reports',
                  'importance')
        read_only_fields = ('id', 'location', 'created_at', 'author',
                            'modified_at', 'comments', 'votes', 'reports')

    def create(self, validated_data):
        issue = Issue.objects.create(
            name=validated_data['name'],
            desc=validated_data['desc'],
            author=validated_data['author'],
            lat=validated_data['lat'],
            lng=validated_data['lng'],
            location='POINT(' + str(validated_data['lat']) +
            ' ' + str(validated_data['lng']) + ')'
        )
        issue.save()
        return issue
