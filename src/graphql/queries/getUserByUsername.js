import { gql } from "@apollo/client";

export const GET_USER_BY_USERNAME = gql`
 query GetUserInfo {
    userByUsername(username: $username){
        id
        username
        role
    }
 }
`