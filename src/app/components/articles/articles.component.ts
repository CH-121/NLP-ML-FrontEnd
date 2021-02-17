import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Data } from 'src/app/Models/Data';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  public data = new Array<Data>();
  private i = 0;
  public fakeResult = "";
  public sentimentResult = "";

  constructor(
    private articlesService: ArticlesService
  ) { }

  // --- Search method (to get data) --- //
  search(form: NgForm){
    this.articlesService.getArticles(form.value.text_area)
    .subscribe(
      result => {
        this.fakeResult = "";
        this.sentimentResult = "";
        this.i = 0;
        for(let index of Object.keys(result['data']['dataTrue'])) {
          this.data[this.i] = new Data();
          this.data[this.i].idDt = result['data']['dataTrue'][index]['id'];
          this.data[this.i].titleDt = result['data']['dataTrue'][index]['title'];
          this.data[this.i].urlDt = result['data']['dataTrue'][index]['url'];
          this.data[this.i].contentDt = result['data']['dataTrue'][index]['content'];
          this.data[this.i].datePostDt = result['data']['dataTrue'][index]['datePost'];
          this.i = this.i + 1;
        }
      },
      error => {
        console.log(error)
      }
    )
  }

  // --- Fake method (to predict fake news) --- //
  fake(text: string){
    this.articlesService.isFake(text)
    .subscribe(
      result => {
        this.data.length = 0;
        this.sentimentResult = "";
        this.fakeResult = result['result'];
        console.log(result['result']);
      },
      error => {
        console.log(error);
      }
    )
  }

  // --- Sentiment method (to predict the sentence sentiment) --- //
  sentiment(text: string){
    this.articlesService.sentimentAnalysis(text)
    .subscribe(
      result => {
        this.data.length = 0;
        this.fakeResult = "";
        this.sentimentResult = result['result'];
        console.log(result['result']);
      },
      error => {
        console.log(error);
      }
    )
  }

  ngOnInit(): void {
  }

}
