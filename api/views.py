from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response

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
        print(self.request.query_params)
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
