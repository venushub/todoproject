from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profilePic = models.TextField()

class Todo(models.Model):
    todoUser = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    todoName = models.TextField(null=False)
    todoDate = models.DateTimeField(null=False)


class Task(models.Model):
    todo = models.ForeignKey(
        'Todo',
        related_name = 'TodoFk',
        on_delete = models.CASCADE)
    taskName = models.TextField(null=False)
    taskDate = models.DateTimeField(null=False)
    taskGoalEnabled = models.CharField(null=False,max_length=10)
    taskGoal = models.DateTimeField(null=True)
    taskDone = models.CharField(max_length=10)

class Comment(models.Model):
    task = models.ForeignKey(
        'Task',
        related_name = 'TaskFk',
        on_delete = models.CASCADE)
    commentName = models.TextField(null=False)
    commentDate = models.DateTimeField(null=False)

class File(models.Model):
    comment = models.ForeignKey(
        'Comment',
        related_name = 'CommentFk',
        on_delete = models.CASCADE)
    fileDate = models.DateTimeField(null=False)
    fileName = models.TextField(null=False)
    fileExtension = models.CharField(max_length=50)
    fileBase64 = models.TextField(null=False)

# Create your models here.
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()
