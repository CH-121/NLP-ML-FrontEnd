import { Injectable } from '@angular/core';
import { Query } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root'
})
export class GraphqlQueriesService extends Query {
  document = gql`
  mutation createUser(
    $username: String!, 
    $email: String!, 
    $password: String!
  ){
  saveUser(objects: {username:$username, email:$email, password:$password}){
    user {
      id
      username
      email
    }
  }
}`
//   document = gql`
//   {
//     allUsers {
//       edges {
//         node {
//           id
//           email
//           username
//         }
//       }
//     }
//   }
// `;
}
