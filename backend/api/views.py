from django.contrib.gis.geos import Point
from rest_framework import permissions
from rest_framework import viewsets
from rest_framework import status
from rest_framework.decorators import list_route, detail_route
from rest_framework.response import Response
from django.db import IntegrityError
from django.db.models import Sum
from django.db.models.functions import Coalesce
from django.core.exceptions import ValidationError
from rest_framework import mixins

from api.serializers import *


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = (permissions.AllowAny,)

    @detail_route(methods=['get'])
    def comments(self, request, pk=None):
        queryset = Comment.objects.filter(author_id=pk)
        serializer = CommentSerializer(
            queryset, many=True, context={'request': request})
        return Response(serializer.data)

    @detail_route(methods=['get'])
    def votes(self, request, pk=None):
        queryset = Vote.objects.filter(author_id=pk)
        serializer = VoteSerializer(
            queryset, many=True, context={'request': request})
        return Response(serializer.data)

    @detail_route(methods=['get'])
    def reports(self, request, pk=None):
        queryset = Report.objects.filter(author_id=pk)
        serializer = ReportSerializer(
            queryset, many=True, context={'request': request})
        return Response(serializer.data)


class ReportViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows reports to be viewed or edited.
    """
    queryset = Report.objects.all().order_by('-issue')
    serializer_class = ReportSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class CommentViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows comments to be viewed or edited.
    """
    queryset = Comment.objects.all().order_by('-issue')
    serializer_class = CommentSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class VoteViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows votes to be viewed or edited.
    """
    queryset = Vote.objects.all().order_by('-issue')
    serializer_class = VoteSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user.username)


class IssueViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows issues to be viewed or edited.
    """
    queryset = Issue.objects.all().order_by('-created_at')
    serializer_class = IssueSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    def get_queryset(self):
        return Issue.objects.annotate(
            importance=Coalesce(Sum('votes__vote'), 0)
        )

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

    @detail_route(methods=['get'])
    def comments(self, request, pk=None):
        queryset = Comment.objects.filter(issue_id=pk)
        serializer = CommentSerializer(
            queryset, many=True, context={'request': request})
        return Response(serializer.data)

    @detail_route(methods=['get'])
    def votes(self, request, pk=None):
        queryset = Vote.objects.filter(issue_id=pk)
        serializer = VoteSerializer(
            queryset, many=True, context={'request': request})
        return Response(serializer.data)

    @detail_route(methods=['get'])
    def reports(self, request, pk=None):
        queryset = Report.objects.filter(issue_id=pk)
        serializer = ReportSerializer(
            queryset, many=True, context={'request': request})
        return Response(serializer.data)

    @list_route()
    def near(self, request):
        lat = self.request.query_params.get('lat', None)
        lng = self.request.query_params.get('lng', None)
        dist = self.request.query_params.get('dist', None)
        if lat is None:
            lat = 0
        if lng is None:
            lng = 0
        if dist is None:
            dist = 25

        flng = float(lng)
        flat = float(lat)
        pnt = Point(flat, flng)
        queryset = Issue.objects.filter(location__dwithin=(pnt, dist))
        serializer = IssueSerializer(queryset, many=True)
        return Response(serializer.data)
