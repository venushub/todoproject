import graphene
from graphene_django import DjangoObjectType
from todocore.models import Task, Todo, Comment, File
import json

class TaskType(DjangoObjectType):
    class Meta:
        model = Task


class Query(object):
    all_tasks_for_todo = graphene.List(TaskType, todoId=graphene.String())

    def resolve_all_tasks_for_todo(self, info, todoId , **kwargs):
        todoInstance = Todo.objects.get(id = todoId)
        return Task.objects.filter(todo = todoInstance)


class CreateTask(graphene.Mutation):
    id = graphene.Int()
    taskName = graphene.String()
    taskDate = graphene.String()
    taskGoalEnabled = graphene.String()
    taskGoal = graphene.String()
    taskDone = graphene.String()

    class Arguments:
        todoId = graphene.String(required=True)
        taskName = graphene.String(required= True)
        taskDate = graphene.String(required=True)
        taskGoalEnabled = graphene.String(required=True)
        taskGoal = graphene.String(required=False)
        taskDone = graphene.String(required=True)

    def mutate(self, info, todoId, taskName, taskDate, taskGoalEnabled ,taskGoal, taskDone):
        todoInstance = Todo.objects.get(id = int(todoId))
        if(taskGoalEnabled == 'no'):
            task = Task(
                todo = todoInstance,
                taskName = taskName,
                taskGoalEnabled = taskGoalEnabled,
                taskDate = taskDate,
                taskDone = taskDone
            )
        else:
            task = Task(
                todo = todoInstance,
                taskName = taskName,
                taskDate = taskDate,
                taskGoalEnabled = taskGoalEnabled,
                taskGoal = taskGoal,
                taskDone = taskDone
            )

        task.save()

        return CreateTask(
            id = task.id,
            taskName = task.taskName,
            taskDate = task.taskDate,
            taskGoalEnabled = task.taskGoalEnabled,
            taskGoal = task.taskGoal,
            taskDone = task.taskDone
        )


class UpdateTask(graphene.Mutation):
    id = graphene.Int()
    taskName = graphene.String()
    taskDate = graphene.String()
    taskGoalEnabled = graphene.String()
    taskGoal = graphene.String()
    taskDone = graphene.String()

    class Arguments:
        taskId = graphene.String(required=True)
        taskName = graphene.String(required=True)
        taskGoalEnabled = graphene.String(required=True)
        taskGoal = graphene.String(required=False)
        taskDone = graphene.String(required=True)

    def mutate(self, info, taskId, taskName, taskGoalEnabled, taskGoal, taskDone):
        taskInstance = Task.objects.get(id = int(taskId))

        taskInstance.taskName = taskName
        taskInstance.taskGoalEnabled = taskGoalEnabled
        if(taskGoalEnabled == 'yes'):
            taskInstance.taskGoal = taskGoal
        taskInstance.taskDone = taskDone

        taskInstance.save()

        return UpdateTask(
            id = taskInstance.id,
            taskName = taskInstance.taskName,
            taskDate = taskInstance.taskDate,
            taskGoalEnabled = taskInstance.taskGoalEnabled,
            taskGoal = taskInstance.taskGoal,
            taskDone = taskInstance.taskDone
        )


class DeleteTask(graphene.Mutation):
    id = graphene.Int()
    taskName = graphene.String()
    taskDate = graphene.String()
    taskGoalEnabled = graphene.String()
    taskGoal = graphene.String()
    taskDone = graphene.String()

    class Arguments:
        taskId = graphene.String(required=True)


    def mutate(self, info, taskId):
        taskInstance = Task.objects.get(id = int(taskId))
        comments = Comment.objects.filter(task = taskInstance)
        for comment in comments:
            File.objects.filter(comment = comment).delete()
            comment.delete()
        taskInstance.delete()

        return DeleteTask(
            id = taskInstance.id,
            taskName = taskInstance.taskName,
            taskDate = taskInstance.taskDate,
            taskGoalEnabled = taskInstance.taskGoalEnabled,
            taskGoal = taskInstance.taskGoal,
            taskDone = taskInstance.taskDone
        )


class Mutation(graphene.ObjectType):
    create_task = CreateTask.Field()
    update_task = UpdateTask.Field()
    delete_task = DeleteTask.Field()
