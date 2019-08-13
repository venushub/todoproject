import graphene
from graphene_django import DjangoObjectType
from todocore.models import Comment, Task, File
import json

class CommentType(DjangoObjectType):
    class Meta:
        model = Comment


class Query(object):
    all_comments_for_task = graphene.List(CommentType, taskId=graphene.String())

    def resolve_all_comments_for_task(self, info, taskId , **kwargs):
        taskInstance = Task.objects.get(id = taskId)
        return Comment.objects.filter(task = taskInstance)


class CreateComment(graphene.Mutation):
    id = graphene.Int()
    commentName = graphene.String()
    commentDate = graphene.String()

    class Arguments:
        taskId = graphene.String(required=True)
        commentName = graphene.String(required= True)
        commentDate = graphene.String(required=True)

    def mutate(self, info, taskId, commentName, commentDate):
        taskInstance = Task.objects.get(id = int(taskId))
        comment = Comment(
            task = taskInstance,
            commentName = commentName,
            commentDate = commentDate,
        )
        comment.save()

        return CreateComment(
            id = comment.id,
            commentName = comment.commentName,
            commentDate = comment.commentDate,
        )

class DeleteComment(graphene.Mutation):
    id = graphene.Int()
    commentName = graphene.String()
    commentDate = graphene.String()

    class Arguments:
        commentId = graphene.String(required=True)

    def mutate(self, info, commentId):
        commentInstance = Comment.objects.get(id = int(commentId))
        File.objects.filter(comment = commentInstance).delete()

        commentInstance.delete()

        return DeleteComment(
            id = commentInstance.id,
            commentName = commentInstance.commentName,
            commentDate = commentInstance.commentDate,
        )


class Mutation(graphene.ObjectType):
    create_comment = CreateComment.Field()
    delete_comment = DeleteComment.Field()
    # update_project = UpdateProject.Field()
