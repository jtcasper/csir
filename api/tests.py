import json

from api.models import User
from django.core.urlresolvers import reverse

from rest_framework.authtoken.models import Token
from rest_framework.test import APITestCase

class UserRegistrationAPIViewTestCase(APITestCase):
    url = reverse("list_users")

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
