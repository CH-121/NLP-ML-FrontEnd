import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GraphqlQueriesService } from './graphql-queries.service';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { HttpLink } from 'apollo-angular/http';
import { OperationType } from '../Models/OperationType';
import { tap } from 'rxjs/operators';

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

@Injectable({
  providedIn: 'root'
})
export class NltkService {
  public data;
  public myOpTypes = new Array<OperationType>();
  public i = 0;

  constructor(
    private http: HttpClient,
    private graphqlService: GraphqlQueriesService,
    private apollo: Apollo,
    httpLink: HttpLink
  ) { 
    this.getOperationTypes();
  }

  // --- Getting opeartion types from backend --- //
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

  // --- Use NLTK services by a guest user --- //
  public actionNotLoggedIn(text: string, operation_type: string){
    switch (operation_type) {
      case "6017f15df39bee1b5c8034f3":
        return this.http.get("http://127.0.0.1:5000/tokenization/"+text);
      case "6017f15df39bee1b5c8034f4":
        return this.http.get("http://127.0.0.1:5000/stopwords/"+text);
      case "6017f15df39bee1b5c8034f5":
        return this.http.get("http://127.0.0.1:5000/lemmatization/"+text);
      case "6017f15df39bee1b5c8034f6":
        return this.http.get("http://127.0.0.1:5000/stemming/"+text);
      case "6017f15df39bee1b5c8034f7":
        return this.http.get("http://127.0.0.1:5000/postagging/"+text);
      case "6017f15df39bee1b5c8034f9":
        return this.http.get("http://127.0.0.1:5000/tfidf/"+text);
      case "6017f15df39bee1b5c8034fa":
        return this.http.get("http://127.0.0.1:5000/word2vect/"+text);
      default:
        break;
    }
  }

  // --- Use NLTK services by a logged user (to save his operations) --- //
  public actionLoggedIn(text: string, operation_type: string, userId: string){
    console.log("Connected in service !");
    return this.apollo.mutate({
        mutation: createOperation,
        variables: {
          text: text, 
          textType: "input",
          userId: userId,
          operationType: operation_type
        }
    });
  }
}
