import { Injectable } from '@angular/core';

import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { User } from '../Models/User';

const getOperations = gql`
  query userOperations(
    $idUser: String
  ){
    userOperations(idUser: $idUser) {
      id
      operationType{
        nameOp
      }
      dateCr
      text
      result
    }
  }`

@Injectable({
  providedIn: 'root'
})
export class OperationService {

  constructor(
    private apollo: Apollo
  ) { }

  // --- Getting a logged user's operations --- //
  getUserOperations(idUser: string){
    return this.apollo.query({
      query: getOperations,
      variables: {
        idUser: idUser
      }
    })
  }
}
