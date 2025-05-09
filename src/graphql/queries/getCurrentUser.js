import { gql } from "@apollo/client";


// GraphQL query to fetch a user's id, username, and role by their username (client-side)
export const GET_USER_BY_USERNAME = gql`
 query GetUserInfo {
    userByUsername(username: $username){
        id
        username
        role
    }
 }
`