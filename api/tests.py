import json

from api.models import User
from django.core.urlresolvers import reverse

from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase, APIClient

class UserRegistrationAPIViewTestCase(APITestCase):
    fixtures = ['testUser.json']
    url = reverse("list_users")

    def setUp(self):
        token = Token.objects.get(user__username='jtcasper')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

    # fields = ('first_name', 'last_name', 'username', 'password', 'email', 'official')
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
        self.assertEqual(201, response.status_code)

        
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
        self.assertEqual(201, response.status_code)

        user_data_2 = {
            "first_name": "Test2",
            "last_name": "Dude2",
            "username": "tdude",
            "password": "password2",
            "email": "tdude2@email.com",
            "official": False
        }
        response = self.client.post(self.url, user_data_2)
        self.assertEqual(409, response.status_code)

class IssueAPIPostTestCase(APITestCase):
    fixtures = ['testUser.json']
    url = reverse("list_issues")

    def setUp(self):
        token = Token.objects.get(user__username='jtcasper')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

    def test_post_issue_creation(self):
        """
        Test to verify that an authorized Issue post will create an issue successfully.
        """
        issue_data = {
            "name": "TestIssue",
            "description": "TestDesc",
            "location": "POINT(78.6382 35.7796)",
        }

        response = self.client.post(self.url, issue_data)
        self.assertEqual(201, response.status_code)

class IssueAPIGetTestCase(APITestCase):
    fixtures = ['testUser.json', 'testIssue.json']
    url = reverse("list_issues")

    def setUp(self):
        token = Token.objects.get(user__username='jtcasper')
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + token.key)

    def test_get_issue_by_id(self):
        """
        Test that an issue can be returned by id
        """
        response = self.client.get(self.url + '?id=1')
        self.assertEqual(200, response.status_code)
        self.assertEqual("TestIssue", response.data.get('name'))
        self.assertEqual("TestDesc", response.data.get('desc'))
        self.assertEqual("jtcasper", response.data.get('author'))

    def test_get_issue_dne(self):
        """
        Test the response for an issue that does not exist
        """
        response = self.client.get(self.url + '?id=999')
        self.assertEqual(400, response.status_code)

    def test_get_issue_lat_lng(self):
        """
        Test the issues that are returned when provided a latitude and a longitude without distance
        """
        response=self.client.get(self.url + '?lat=78.6382&lng=35.779')
        self.assertEqual(200, response.status_code)
        self.assertEqual("TestIssue", response.data[0].get('name'))
        self.assertEqual("TestDesc", response.data[0].get('desc'))
        self.assertEqual("jtcasper", response.data[0].get('author'))

