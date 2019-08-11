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


export {getTokenMutation,
        verifyTokenMutation,
        createUserMutation,
        getMe
        };
