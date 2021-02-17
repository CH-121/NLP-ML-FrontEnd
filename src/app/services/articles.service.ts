import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const getTrueData = gql`
  query dataTrue(
    $title: String
  ){
    dataTrue(title: $title) {
      id
      title
      datePost
      content
      url
    }
  }`

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(
    private apollo: Apollo,
    private http: HttpClient
  ) { }

  // --- Method to get articles from backend --- //
  getArticles(text: string){
    return this.apollo.query({
      query: getTrueData,
      variables: {
        title: text
      }
    })
  }

  // --- Method to get predicted result of a text (fake/true) from backend --- //
  isFake(text: string){
    return this.http.get("http://127.0.0.1:5000/fakenews/"+text);
  }

  // --- Method to get predicted sentiment of a text (neutral/positive/negative) from backend --- //
  sentimentAnalysis(text: string){
    return this.http.get("http://127.0.0.1:5000/sentimentanalysis/"+text);
  }
}
