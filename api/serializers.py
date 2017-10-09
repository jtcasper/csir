from rest_framework import serializers

from api.models import *


class IssueSerializer(serializers.HyperlinkedModelSerializer):
    reports = serializers.HyperlinkedRelatedField(many=True, read_only=True, view_name='report-detail')
    votes = serializers.HyperlinkedRelatedField(many=True, read_only=True, view_name='vote-detail')
    comments = serializers.HyperlinkedRelatedField(many=True, read_only=True,
                                                   view_name='comment-detail')

    class Meta:
        model = Issue
        fields = (
            'id', 'name', 'desc', 'location', 'author', 'created_at', 'modified_at', 'comments', 'votes', 'reports')


class UserSerializer(serializers.HyperlinkedModelSerializer):
    issues = serializers.HyperlinkedRelatedField(many=True, read_only=True, view_name='issue-detail')
    reports = serializers.HyperlinkedRelatedField(many=True, read_only=True, view_name='report-detail')
    votes = serializers.HyperlinkedRelatedField(many=True, read_only=True, view_name='vote-detail')
    comments = serializers.HyperlinkedRelatedField(many=True, read_only=True,
                                                   view_name='comment-detail')

    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'username', 'password', 'email', 'official', 'comments', 'issues', 'votes',
                  'reports')
        extra_kwargs = {
            'password': {'write_only': True}
        }


class VoteSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Vote
        fields = ('vote', 'author', 'issue')


class CommentSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Comment
        fields = ('body', 'author', 'issue')


class ReportSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Report
        fields = ('body', 'author', 'issue')
