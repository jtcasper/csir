from django.core.urlresolvers import reverse
from django.test import TestCase
from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

from api.models import User, Issue

OK = 200
CREATED = 201
NOT_FOUND = 404
BAD_REQUEST = 400


class UserRegistrationAPIViewTestCase(APITestCase):
    fixtures = ['testUser.json']
    url = reverse("user-list")

    def setUp(self):
        token = Token.objects.get(user__username='jtcasper')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

    def test_user_registration(self):
        """
        Test to verify a post call valid information
        """
        user_data = {
            "first_name": "Test",
            "last_name": "Dude",
            "username": "tdude",
            "password": "password",
            "email": "tdude@email.com",
            "official": False
        }

        response = self.client.post(self.url, user_data)
        self.assertEqual(CREATED, response.status_code)

    def test_unique_username_validation(self):
        """
        Test to verify that a post call with already exists username
        """
        user_data_1 = {
            "first_name": "Test",
            "last_name": "Dude",
            "username": "tdude",
            "password": "password",
            "email": "tdude@email.com",
            "official": False
        }
        response = self.client.post(self.url, user_data_1)
        self.assertEqual(CREATED, response.status_code)

        user_data_2 = {
            "first_name": "Test2",
            "last_name": "Dude2",
            "username": "tdude",
            "password": "password2",
            "email": "tdude2@email.com",
            "official": False
        }
        response = self.client.post(self.url, user_data_2)
        self.assertEqual(BAD_REQUEST, response.status_code)


class IssueAPIPostTestCase(APITestCase):
    fixtures = ['testUser.json']
    url = reverse("issue-list")

    def setUp(self):
        token = Token.objects.get(user__username='jtcasper')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

    def test_post_issue_creation(self):
        """
        Test to verify that an authorized Issue post will create an issue successfully.
        """

        issue_data = {
            "name": "The roads are all broken.",
            "desc": "Somehow, every road needs to be repaired?",
            "lat": '78.6382',
            "lng": '35.7796',
            "author": "jtcasper"
        }

        response = self.client.post(self.url, issue_data)
        self.assertEqual(CREATED, response.status_code)


class IssueAPIGetTestCase(APITestCase):
    fixtures = ['testUser.json', 'testIssue.json']
    url = reverse("issue-list")

    def setUp(self):
        token = Token.objects.get(user__username='jtcasper')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

    def test_get_issue_by_id(self):
        """
        Test that an issue can be returned by id
        """
        response = self.client.get(self.url + '1/')
        self.assertEqual(OK, response.status_code)
        self.assertEqual("TestIssue", response.data.get('name'))
        self.assertEqual("TestDesc", response.data.get('desc'))
        self.assertEqual("jtcasper", response.data.get('author'))

    def test_get_issue_dne(self):
        """
        Test the response for an issue that does not exist
        """
        response = self.client.get(self.url + '999/')
        self.assertEqual(NOT_FOUND, response.status_code)

    def test_get_issue_by_dist(self):
        """
        Test getting the nearest issues to the user.
        """
        response = self.client.get(self.url + 'near/')
        self.assertEqual(OK, response.status_code)
        self.assertEqual(b'[]', response.content)  # Empty byte array

    def test_get_issue_comments(self):
        """
        Test getting the comments for an issue.
        """
        response = self.client.get(self.url + '1/comments/')
        self.assertEqual(OK, response.status_code)
        self.assertEqual(b'[]', response.content)  # Empty byte array

    def test_get_issue_votes(self):
        """
        Test getting the votes for an issue.
        """
        response = self.client.get(self.url + '1/votes/')
        self.assertEqual(OK, response.status_code)
        self.assertEqual(b'[]', response.content)  # Empty byte array

    def test_get_issue_reports(self):
        """
        Test getting the reports for an issue.
        """
        response = self.client.get(self.url + '1/reports/')
        self.assertEqual(OK, response.status_code)
        self.assertEqual(b'[]', response.content)  # Empty byte array


"""
TEST MODELS
"""


class IssueModelTestCase(TestCase):
    fixtures = ['testUser.json']

    def test_string_representation(self):
        issue = Issue(name="TestIssue", desc="TestDesc", lng=1337, lat=1337)
        self.assertEqual(str(issue), issue.name)


class UserModelTestCase(TestCase):
    def test_string_representation(self):
        user = User(username="lwkerr", email="lwkerr@ncsu.edu", first_name="Len", last_name="Kerr")
        self.assertEqual(str(user), user.username)
