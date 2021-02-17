import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/User';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public error = " ";
  public user = new User();
  public duplicatedEmail;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  // --- Method checks if password and password confirmation are the same --- //
  isValidPassword(password: string, passwordConfirmation: string) {
    if(password == passwordConfirmation)
      return true;
    else
      return false;  
  }

  // --- Sign Up method --- //
  signup(form: NgForm) {
    // --- If password and password confirmation are the same --- //
    if(this.isValidPassword(form.value.password, form.value.passwordConfirmation)){
      this.authenticationService.exist(form.value.email).subscribe(
        result => {
          // --- If it return a result, so it means that the email exists already --- //
          this.error = "E-mail already exists !";
        },
        error => {
          // --- If we get ana error, so it means that the email doesn't exist --- //
          if(error!=null){
            // --- Calling signup function to create the account --- //
            this.authenticationService.signup(form).subscribe(
              ({ data }) => {
                this.user.id = data['createUser']['user']['id'];
                this.user.username = data['createUser']['user']['username'];
                this.user.email = data['createUser']['user']['email'];
                this.authenticationService.setUser(this.user);

                this.router.navigateByUrl('/nltk', {state: {user: this.user}});
              },
              error => {
                this.error = "Error while sending infos to the backend !"
                console.log("There was an error sending the query, ", error);
              }
            );
          }
          console.log(error);
        }
      );
    }
    // --- If password and password confirmation are not the same --- //
    else{
      this.error = "Password and password confirmation are not the same !"
    }
  }
  
  ngOnInit(): void {
  }

}
