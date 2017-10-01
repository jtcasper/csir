from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from django import forms

from api.serializers import *
from api.models import *


class ListCreateIssues(generics.ListCreateAPIView):
    queryset = Issue.objects.all()
    serializer_class = IssueSerializer

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
                content = {'response':'User/PW not found'}
                return  Response(content, status=status.HTTP_204_NO_CONTENT)
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
                content = {'response':'User with that name already exists'}
                return Response(content, status=status.HTTP_409_CONFLICT)
            user = User.objects.create_user(username=username, password=password, email=email)
            user.first_name, user.last_name = fname, lname
            user.save()
            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response(status=status.HTTP_204_NO_CONTENT)
