import {gql} from 'apollo-boost'


const getTokenMutation = gql`
    mutation tokenAuth($username: String!, $password: String!){
        tokenAuth(username: $username, password: $password){
            token
        }
    }
`;


const verifyTokenMutation = gql`
    mutation verifyToken($token: String!){
        verifyToken(token: $token){
            payload
        }
    }
`;

const createUserMutation = gql`
  mutation createUser($username: String!, $password: String!){
    createUser(username: $username, password: $password){
      user{
        username
        email
      }
    }
  }
`;

const getMe = gql`
{
  me {
    id
    username
  }
}
`

const getTodosQuery = gql`
{
  allTodos {
    id
    todoName
    todoDate
    }
}
`

const getTasksQuery = gql`
  query allTasksForTodo($todoId : String){
    allTasksForTodo(todoId : $todoId){
      id
      taskName
      taskDate
      taskGoal
      taskDone
      taskGoalEnabled
    }
  }
`

const getCommentsQuery = gql`
  query allCommentsForTask($taskId : String){
    allCommentsForTask(taskId : $taskId){
      id
      commentName
      commentDate
    }
  }
`

const getFilesQuery = gql`
  query allFilesForComment($commentId : String){
    allFilesForComment(commentId : $commentId){
      id
      fileName
      fileExtension
      fileDate
      fileBase64
    }
  }
`

const getFileQuery = gql`
  query getFile($fileId : String){
    getFile(fileId : $fileId){
      id
      fileName
      fileExtension
      fileDate
      fileBase64
    }
  }
`


const createTodoMutation = gql`
  mutation createTodo($todoName: String!, $todoDate: String!){
    createTodo(todoName: $todoName, todoDate: $todoDate){
      id
    }
  }
`;

const createTaskMutation = gql`
  mutation createTask($todoId : String!, $taskName: String!, $taskDate: String!, $taskGoalEnabled: String! ,$taskGoal: String!, $taskDone: String!){
    createTask(todoId : $todoId, taskName: $taskName, taskDate: $taskDate, taskGoalEnabled: $taskGoalEnabled ,taskGoal: $taskGoal,taskDone: $taskDone){
      id
    }
  }
`;

const createCommentMutation = gql`
  mutation createComment($taskId : String!, $commentName: String!, $commentDate: String!){
    createComment(taskId : $taskId, commentName: $commentName, commentDate: $commentDate){
      id

    }
  }
`;


const createFileMutation = gql`
  mutation createFile($commentId : String!, $fileName: String!, $fileExtension: String!,  $fileBase64: String! , $fileDate: String!){
    createFile(commentId : $commentId, fileName: $fileName, fileExtension: $fileExtension, fileBase64:$fileBase64 , fileDate: $fileDate){
      id
    }
  }
`;


const updateTodoMutation = gql`
  mutation updateTodo($todoId: String!, $todoName: String!){
    updateTodo(todoId: $todoId, todoName: $todoName){
      id
      todoName
    }
  }
`;

const updateTaskMutation = gql`
  mutation updateTask($taskId: String!, $taskName: String!, $taskGoalEnabled: String! ,$taskGoal: String!, $taskDone: String!){
    updateTask(taskId: $taskId, taskName: $taskName, taskGoalEnabled : $taskGoalEnabled ,taskGoal : $taskGoal, taskDone : $taskDone){
      id
      taskName
      taskGoal
      taskDone
      taskGoalEnabled
    }
  }
`;

const deleteCommentMutation = gql`
  mutation deleteComment($commentId: String!){
    deleteComment(commentId: $commentId){
      id
    }
  }
`;

const deleteTaskMutation = gql`
  mutation deleteTask($taskId: String!){
    deleteTask(taskId: $taskId){
      id
    }
  }
`;


const deleteTodoMutation = gql`
  mutation deleteTodo($todoId: String!){
    deleteTodo(todoId: $todoId){
      id
    }
  }
`;


export {getTokenMutation,
        verifyTokenMutation,
        createUserMutation,
        getMe,
        getTodosQuery,
        getTasksQuery,
        createTodoMutation,
        createTaskMutation,
        getCommentsQuery,
        createCommentMutation,
        getFilesQuery,
        createFileMutation,
        updateTodoMutation,
        updateTaskMutation,
        deleteCommentMutation,
        deleteTaskMutation,
        deleteTodoMutation,
        getFileQuery
        };
