import graphene
import graphql_jwt
import todocore.users.schema as users_schema
import todocore.todo.schema as todo_schema
import todocore.task.schema as task_schema
import todocore.comment.schema as comment_schema
import todocore.file.schema as file_schema

class Mutation(users_schema.Mutation,
                todo_schema.Mutation,
                task_schema.Mutation,
                file_schema.Mutation,
                comment_schema.Mutation,
                graphene.ObjectType):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()

class Query(users_schema.Query,
            todo_schema.Query,
            task_schema.Query,
            comment_schema.Query,
            file_schema.Query,
            graphene.ObjectType
            ):
    # This class will inherit from multiple Queries
    # as we begin to add more apps to our project
    pass

schema = graphene.Schema(query=Query, mutation=Mutation)
