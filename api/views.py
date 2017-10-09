from rest_framework import generics
from rest_framework import status
from rest_framework import viewsets
from rest_framework.response import Response
from django.contrib.gis.geos import Point
from django import forms

from api.serializers import *
from api.models import *


class ListCreateIssues(generics.ListCreateAPIView):
    queryset = Issue.objects.all()
    serializer_class = IssueSerializer

    def get(self, request, *args, **kwargs):
        id = self.request.query_params.get('id', None)
        lat = self.request.query_params.get('lat', None)
        lng = self.request.query_params.get('lng', None)
        dist = self.request.query_params.get('dist', None)
        if id is not None:
            try:
                issue = Issue.objects.get(id=id)
            except Issue.DoesNotExist:
                return Response(status=status.HTTP_400_BAD_REQUEST)
            issueSerial = IssueSerializer(issue)
            return Response(issueSerial.data, status=status.HTTP_200_OK)
        if lat is not None and lng is not None:
            if dist is None:
                dist = 25
            print(lng)
            print(lat)
            flng = float(lng)
            flat = float(lat)
            pnt = Point(flat, flng)
            print(pnt)
            issueSet = Issue.objects.filter(location__dwithin=(pnt, dist))
            print(issueSet)
            issueSetSerial = IssueSerializer(issueSet, many=True)
            print(issueSetSerial)

            return Response(issueSetSerial.data, status=status.HTTP_200_OK)


    def post(self, request, *args, **kwargs):
        name = self.request.data.get('name', None)
        description = self.request.data.get('description', None)
        lng = self.request.data.get('lng', None)
        lat = self.request.data.get('lat', None)
        author = self.request.user
        flat = None
        flng = None
        if lat is not None and lng is not None:
            flat = float(lat)
            flng = float(lng)
        for param in [name, description, lat, lng, author]:
            print(param)
        if all(param is not None for param in [name, description, flng, flat, author]):
            try:
                User.objects.get(username=author)
            except User.DoesNotExist:
                return Response(status=status.HTTP_400_BAD_REQUEST)
            location = Point(flat, flng)
            issue = Issue.objects.create(name=name, desc=description, location=location, author=author)
            issue.save()
            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class ListCreateVotes(generics.ListCreateAPIView):
    queryset = Vote.objects.all()
    serializer_class = VoteSerializer


class ListCreateComments(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer


class ListCreateReports(generics.ListCreateAPIView):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer


class ListCreateUsers(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get(self, request, *args, **kwargs):
        # print(self.request.query_params)
        username = self.request.query_params.get('username', None)
        password = self.request.query_params.get('password', None)
        if username is not None:
            try:
                user = User.objects.get(username=username, password=password)
            except User.DoesNotExist:
                user = None
            print(user)
            print('help')
            if user is not None:
                userSerial = UserSerializer(user)
                return Response(userSerial.data, status=status.HTTP_200_OK)
            else:
                print('here')
                content = {'response': 'User/PW not found'}
                return Response(content, status=status.HTTP_204_NO_CONTENT)
        else:
            print('no username')
            return Response(status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, *args, **kwargs):
        username = self.request.data.get('username', None)
        password = self.request.data.get('password', None)
        email = self.request.data.get('email', None)
        fname = self.request.data.get('first_name', None)
        lname = self.request.data.get('last_name', None)
        for param in [username, password, email, fname, lname]:
            print(param)
        if all(param is not None for param in [username, password, email, fname, lname]):
            user = User.objects.filter(username=username)
            if user.exists():
                content = {'response': 'User with that name already exists'}
                return Response(content, status=status.HTTP_409_CONFLICT)
            user = User.objects.create_user(username=username, password=password, email=email)
            user.first_name, user.last_name = fname, lname
            user.save()
            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_204_NO_CONTENT)


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class ReportViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows reports to be viewed or edited.
    """
    queryset = Report.objects.all().order_by('-issue')
    serializer_class = ReportSerializer


class CommentViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows comments to be viewed or edited.
    """
    queryset = Comment.objects.all().order_by('-issue')
    serializer_class = CommentSerializer


class VoteViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows votes to be viewed or edited.
    """
    queryset = Vote.objects.all().order_by('-issue')
    serializer_class = VoteSerializer


class IssueViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows issues to be viewed or edited.
    """
    queryset = Issue.objects.all().order_by('-created_at')
    serializer_class = IssueSerializer
