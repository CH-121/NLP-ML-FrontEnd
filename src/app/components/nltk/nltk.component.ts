import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { OperationType } from 'src/app/Models/OperationType';
import { User } from 'src/app/Models/User';
import { Router } from '@angular/router';
import { NltkService } from 'src/app/services/nltk.service';

@Component({
  selector: 'app-nltk',
  templateUrl: './nltk.component.html',
  styleUrls: ['./nltk.component.css']
})
export class NltkComponent implements OnInit {
  public response = []; 
  public result: string = "";
  public myOpTypes = new Array<OperationType>();
  public user = new User();
  
  constructor(
    private http: HttpClient,
    private nltkService: NltkService,
    public authenticationService: AuthenticationService,
    private router: Router,

  ) {
    this.myOpTypes = this.nltkService.myOpTypes;
  }

  // --- Action method (to get result of an operation) --- //
  action(form: NgForm) {
    // --- If the user is logged --- //
    if(this.user.id == ""){
      this.nltkService.actionNotLoggedIn(form.value.text_area, form.value.operation_type)
      .subscribe(
        result => {
          this.result = result['result'];
          console.log(result['result']);
        },
        error => {
          console.log(error)
        }
      )
    }
    // --- If the user is a guest user --- //
    else{
      this.nltkService.actionLoggedIn(form.value.text_area, form.value.operation_type, this.user.id)
      .subscribe(
        ({ data }) => {
          this.result = data['createOperation']['operation']['result'];
          console.log(data['createOperation']['operation']['result']);
        },
        error => {
          console.log(error);
        }
      );
    }




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

  // --- Getting operation types and logged user (if logged) in ngOnInit method --- //
  ngOnInit(): void {
    this.myOpTypes = this.nltkService.myOpTypes;
    if(history.state['user'] != null){
      this.user = history.state['user'];
    }
    else if(this.authenticationService.getIsLoggedIn()){
      this.user = this.authenticationService.getUser();
    }
  }

}
