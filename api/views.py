from django.contrib.gis.geos import Point
from rest_framework import permissions
from rest_framework import viewsets
from rest_framework.decorators import list_route, detail_route
from rest_framework.response import Response

from api.serializers import *


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = (permissions.AllowAny,)


class ReportViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows reports to be viewed or edited.
    """
    queryset = Report.objects.all().order_by('-issue')
    serializer_class = ReportSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)


class CommentViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows comments to be viewed or edited.
    """
    queryset = Comment.objects.all().order_by('-issue')
    serializer_class = CommentSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)


class VoteViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows votes to be viewed or edited.
    """
    queryset = Vote.objects.all().order_by('-issue')
    serializer_class = VoteSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)


class IssueViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows issues to be viewed or edited.
    """
    queryset = Issue.objects.all().order_by('-created_at')
    serializer_class = IssueSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

    @detail_route(methods=['get'])
    def comments(self, request, pk=None):
        queryset = Comment.objects.filter(issue_id=pk)
        serializer = CommentSerializer(queryset, many=True, context={'request': request})
        return Response(serializer.data)

    @detail_route(methods=['get'])
    def votes(self, request, pk=None):
        queryset = Vote.objects.filter(issue_id=pk)
        serializer = VoteSerializer(queryset, many=True, context={'request': request})
        return Response(serializer.data)

    @detail_route(methods=['get'])
    def reports(self, request, pk=None):
        queryset = Report.objects.filter(issue_id=pk)
        serializer = ReportSerializer(queryset, many=True, context={'request': request})
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
