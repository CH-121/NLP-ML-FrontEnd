import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { HomeService } from 'src/app/services/home.service';
import { OperationType } from 'src/app/Models/OperationType';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public response = []; 
  public result: string = "";
  public myOpTypes = new Array<OperationType>();
  
  constructor(
    private http: HttpClient,
    private homeService: HomeService
  ) {
    // for(let opType of this.myOpTypes) {
    //   opType = new OperationType();
    // }
    this.myOpTypes = this.homeService.myOpTypes;
  }

  action(form: NgForm) {
    // console.log("Type : " + form.value.operation_type);
    // console.log(form.value.text_area)
    this.homeService.action(form.value.text_area, form.value.operation_type)
    .subscribe(
      ({ data }) => {
        this.result = data['createOperation']['operation']['result'];
        console.log(data['createOperation']['operation']['result']); // data['text']['after'][0]
      },
      error => {
        console.log(error);
      }
    );




    // this.result = this.homeService.data;
    // console.log("Result from component :"+this.homeService.data);
    // .subscribe(
    //   data => {
    //     console.log("Result from component :"+this.homeService.data);
    //     // this.result = data;
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // )

    // .subscribe(
    //   ({ data }) => {
    //     console.log(data['createOperation']['operation']['result']);
    //     this.response = data['createOperation']['operation']['result'];
    //     alert("Operation Saved!")
    //   },
    //   error => {
    //     console.log("there was an error sending the query, ", error);
    //   }
    // );

    
  }

  ngOnInit(): void {
    // this.homeService.qry();
    this.myOpTypes = this.homeService.myOpTypes;
  }

}
