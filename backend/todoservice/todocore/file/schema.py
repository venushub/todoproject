import graphene
from graphene_django import DjangoObjectType
from todocore.models import File, Comment
import json

class FileType(DjangoObjectType):
    class Meta:
        model = File


class Query(object):
    all_files_for_comment = graphene.List(FileType, commentId=graphene.String())
    get_file = graphene.Field(FileType, fileId=graphene.String())

    def resolve_all_files_for_comment(self, info, commentId , **kwargs):
        commentInstance = Comment.objects.get(id = commentId)
        return File.objects.filter(comment = commentInstance)

    def resolve_get_file(self, info, fileId, **kwargs):
        return File.objects.get(id = fileId)


class CreateFile(graphene.Mutation):
    id = graphene.Int()
    fileName = graphene.String()
    fileExtension = graphene.String()
    fileDate = graphene.String()

    class Arguments:
        commentId = graphene.String(required=True)
        fileName = graphene.String(required= True)
        fileExtension = graphene.String(required=True)
        fileBase64 = graphene.String(required=True)
        fileDate = graphene.String(required=True)

    def mutate(self, info, commentId, fileName, fileExtension, fileBase64, fileDate):
        commentInstance = Comment.objects.get(id = int(commentId))
        file = File(
            comment = commentInstance,
            fileName = fileName,
            fileExtension = fileExtension,
            fileBase64 = fileBase64,
            fileDate = fileDate,
        )
        file.save()

        return CreateFile(
            id = file.id,
            fileName = file.fileName,
            fileExtension = file.fileExtension,
            fileDate = file.fileDate,
        )


# class UpdateProject(graphene.Mutation):
#     id = graphene.Int()
#     projectName= graphene.String()
#     projectDesc = graphene.String()
#     projectPic = graphene.String()
#
#     class Arguments:
#         project = graphene.String(required= True)
#         projectDesc=graphene.String(required=True)
#         projectPic=graphene.String(required=True)
#         invActTypes=graphene.String(required=True)
#
#     def mutate(self, info,  project, projectDesc, projectPic, invActTypes):
#         print(info)
#         print("ooooooooooooooo")
#         if(project != 'default'):
#             projectInstance = Project.objects.get(id = int(project))
#
#
#         if(projectDesc != 'default'):
#             projectInstance.projectDesc = projectDesc
#
#         if(projectPic != 'default'):
#             projectInstance.projectPic = projectPic
#             print("set kar diyaaaaaaaaaa")
#         if(invActTypes != 'default'):
#             print('see')
#             criteria = json.loads(invActTypes)
#             invATs = criteria["invActTypes"]
#
#
#             psi = projectInstance.activitiesInvolved.all()
#             for y in psi:
#                 projectInstance.activitiesInvolved.remove(y)
#                 # profile.save()
#             for x in invATs:
#                 at = ActivityType.objects.get(id= int(x))
#                 projectInstance.activitiesInvolved.add(at)
#                 # profile.save()
#         projectInstance.save()
#
#         return UpdateProject(
#             id = projectInstance.id,
#             projectName=  projectInstance.projectName,
#             projectDesc = projectInstance.projectDesc,
#             projectPic = projectInstance.projectPic
#         )


class Mutation(graphene.ObjectType):
    create_file = CreateFile.Field()
    # update_project = UpdateProject.Field()
