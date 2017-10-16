from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from api.models import Issue
from .models import User


@admin.register(Issue)
class IssueAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'desc', 'created_at', 'modified_at')


admin.site.register(User, UserAdmin)
