from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User
from api.models import Issue


@admin.register(Issue)
class IssueAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'desc', 'created_at', 'modified_at')

admin.site.register(User, UserAdmin)
