import graphene
from graphene_django import DjangoObjectType
from todocore.models import Todo, Task , Comment, File
import json
from todocore.users.schema import UserType


class TodoType(DjangoObjectType):
    class Meta:
        model = Todo


class Query(object):
    all_todos = graphene.List(TodoType)

    def resolve_all_todos(self, info, **kwargs):
        return Todo.objects.filter(todoUser = info.context.user.id)


class CreateTodo(graphene.Mutation):
    id = graphene.Int()
    todoUser = graphene.Field(UserType)
    todoName = graphene.String()
    todoDate = graphene.String()

    class Arguments:
        todoName = graphene.String(required= True)
        todoDate = graphene.String(required=True)

    def mutate(self, info, todoName, todoDate):
        todo = Todo(
            todoUser = info.context.user,
            todoName = todoName,
            todoDate = todoDate,
        )

        todo.save()

        return CreateTodo(
            id = todo.id,
            todoUser = todo.todoUser,
            todoName = todo.todoName,
            todoDate = todo.todoDate
        )

class UpdateTodo(graphene.Mutation):
    id = graphene.Int()
    todoName = graphene.String()

    class Arguments:
        todoId = graphene.String(required=True)
        todoName = graphene.String(required=True)

    def mutate(self, info, todoId ,todoName):
        todoInstance = Todo.objects.get(id= int(todoId))
        todoInstance.todoName = todoName
        todoInstance.save()

        return UpdateTodo(
            id = todoInstance.id,
            todoName = todoInstance.todoName,
        )

class DeleteTodo(graphene.Mutation):
    id = graphene.Int()
    todoName = graphene.String()

    class Arguments:
        todoId = graphene.String(required=True)

    def mutate(self, info, todoId ):
        todoInstance = Todo.objects.get(id = int(todoId))
        tasks = Task.objects.filter(todo = todoInstance)
        for task in tasks:
            comments = Comment.objects.filter(task = task)
            for comment in comments:
                File.objects.filter(comment = comment).delete()
                comment.delete()
            task.delete()
        todoInstance.delete()

        return DeleteTodo(
            id = todoInstance.id,
            todoName = todoInstance.todoName,
        )


class Mutation(graphene.ObjectType):
    create_todo = CreateTodo.Field()
    update_todo = UpdateTodo.Field()
    delete_todo = DeleteTodo.Field()
