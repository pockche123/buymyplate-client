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

// function UserSearch() {
//     const [username, setUsername] = useState(""); // State to store input
//     const { loading, error, data, refetch } = useQuery(GET_USER_BY_USERNAME, {
//       variables: { username }, // Pass the username dynamically
//       skip: !username, // Skip query if username is empty
//     });
// }