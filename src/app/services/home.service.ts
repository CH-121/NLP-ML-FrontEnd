import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { GraphqlQueriesService } from './graphql-queries.service';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/cache/inmemory/inMemoryCache';
import { OperationType } from '../Models/OperationType';

const getUsers = gql`
  query getUsers {
    users {
      id
      email
      username
    }
  }`;

const getOpTypes = gql`
  query getOpTypes {
    operationTypes {
      id
      nameOp
    }
}`;

const createOperation = gql`
  mutation createOperation(
    $text: String,
    $textType: String,
    $userId: String,
    $operationType: String
  ){
    createOperation(
      text:$text, 
      textType:$textType, 
      userId:$userId,
      operationType:$operationType
    ){
      operation {
        id
        text
        result
      }
    }
  }
`;

const createUser = gql`
  mutation createUser(
    $username: String!, 
    $email: String!, 
    $password: String!
  ){
  createUser(username:$username, email:$email, password:$password){
    user {
      id
      username
      email
    }
  }
}`;

const deleteUser = gql`
  mutation deleteUser(
    $id: String!
  ){
  deleteUser(id:$id){
    user {
      id
      username
      email
    }
  }
}`;

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  public data;
  public myOpTypes = new Array<OperationType>();
  public i = 0;

  constructor(
    private http: HttpClient,
    private graphqlService: GraphqlQueriesService,
    private apollo: Apollo,
    httpLink: HttpLink
  ) {
    // apollo.create({
    //   link: httpLink.create({ uri: 'http://127.0.0.1:5000/graphql' }),
    //   cache: new InMemoryCache()
    // }) 
    this.getOperationTypes();
  }
  
  public getOperationTypes() {
    return this.apollo.query({
      query: getOpTypes
    }).subscribe(
      result => {
        console.log(result['data']['operationTypes'][0]['nameOp']);
        this.i = 0;
        for(let index of Object.keys(result['data']['operationTypes'])) {
          this.myOpTypes[this.i] = new OperationType();
          this.myOpTypes[this.i].idOpType = result['data']['operationTypes'][index]['id'];
          this.myOpTypes[this.i].nameOpType = result['data']['operationTypes'][index]['nameOp'];
          this.i = this.i + 1;
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  public qry() {
    // -------- get Users (works) -------
    this.apollo.query({
      query: getUsers
    }).subscribe(
        result => {
          this.data = result.data['users'];
        console.log(this.data);
        },
        error => {
          console.log(error);
        }
      )
    // ------------- Create user (works) --------------
    // this.apollo.mutate({
    //   mutation: createUser,
    //   variables: {
    //     username: "Ghaith",
    //     email: "ghaith@gmail.com",
    //     password: "123"
    //   }
    // }).subscribe(
    //   ({ data }) => {
    //     console.log(data['createUser']['user']['username'])
    //     // alert("User Saved!")
    //   },
    //   error => {
    //     console.log("there was an error sending the query, ", error);
    //   }
    // );
    // ------------- Delete user (works) --------------
    // this.apollo.mutate({
    //   mutation: deleteUser,
    //   variables: {
    //     id: "6017f53e07bbc1ecb58f6b3f"
    //   }
    // }).subscribe(
    //   ({ data }) => {
    //     console.log(data)
    //   },
    //   error => {
    //     console.log("there was an error sending the query, ", error);
    //   }
    // );
    // ------------- get Users (works) --------------
    // this.graphqlService.fetch().subscribe(
    //   result => {
    //     this.data = result.data['allUsers']['edges'];
    //   console.log(this.data);
    //   }
    // )
  }
  
  public action(text: string, operation_type: string){
    return this.apollo.mutate({
        mutation: createOperation,
        variables: {
          text: text, 
          textType: "input",
          userId: "6017f15df39bee1b5c8034f2",
          operationType: operation_type
        }
      });
      // .subscribe(
      //   ({ data }) => {
      //     this.data = data['createOperation']['operation']['result'];
      //     console.log(data['createOperation']['operation']['result'])
      //     alert(this.data)
      //   },
      //   error => {
      //     console.log("there was an error sending the query, ", error);
      //   }
      // );
      // return this.data;



    // console.log("I'm in the service class !");
    // let headers = new HttpHeaders();
    // headers.append('Content-Type', 'application/json');
    // let params = new HttpParams();
    // params.append("text", text);
    // return this.http.get("http://127.0.0.1:5000/", {
    //   headers: headers, params: params
    // }).pipe(
    //     tap(
    //       data => {
    //         console.log(data["text"]);
    //         return data["text"];
    //       },
    //       error => {
    //         console.log(error);
    //       }
    //     )
    //   )
    /* ---------------------------------------------- */
    // return this.http.get("http://127.0.0.1:5000/graphql?"+"{users {id,email,username}}");
    // return this.http.get("http://127.0.0.1:5000/tokenization/"+text);
    /* ---------------------------------------------- */
    // .pipe(
    //   tap(
    //     data => {
    //       console.log(data["text"]);
    //       return data["text"];
    //     },
    //     error => {
    //       console.log(error);
    //     }
    //   )
    // )
  }

}
