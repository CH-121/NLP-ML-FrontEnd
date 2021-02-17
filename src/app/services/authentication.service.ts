import { Injectable } from '@angular/core';

import { GraphqlQueriesService } from './graphql-queries.service';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { HttpLink } from 'apollo-angular/http';
import { User } from '../Models/User';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

const getUser = gql`
  query userLogin(
    $email: String,
    $password: String
  ) {
    userLogin(
      email: $email,
      password: $password
    ) {
      id
      username
      email
    }
  }`;

const getExistUser = gql`
  query userEmailExist(
    $email: String
  ){
    userEmailExist(email: $email) {
      email
    }
  }`

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

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public user = new User();
  public isLoggedIn = false;

  // --- Constructor --- //
  constructor(
    private apollo: Apollo,
    private router: Router
  ) { }

  // --- Getters & Setters --- //
  setIsLoggedIn(b: boolean){
    this.isLoggedIn = b;
  }

  getIsLoggedIn(){
    return this.isLoggedIn;
  }

  setUser(user: User){
    this.user = user;
  }

  getUser(){
    return this.user;
  }
  
  // --- Login method --- //
  login(form: NgForm){
    return this.apollo.query({
      query: getUser,
      variables: {
        email: form.value.email,
        password: form.value.password
      }
    });
  }

  // --- Method checks if the email exists on DB --- //
  exist(email: string){
    return this.apollo.query({
      query: getExistUser,
      variables: {
        email: email
      }
    })
  }

  // --- Signup method --- //
  signup(form: NgForm){
    return this.apollo.mutate({
      mutation: createUser,
      variables: {
        username: form.value.username,
        email: form.value.email,
        password: form.value.password
      }
    })
  }

  // --- Logout method --- //
  logout(){
    this.user = new User();
    this.isLoggedIn = false;
    this.router.navigateByUrl('login');
  }

}
