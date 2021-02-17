import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/Models/User';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user = new User();
  public error = " ";

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  // --- Login method --- //
  login(form: NgForm) {
    this.authenticationService.login(form).subscribe(
      result => {
        this.user.id = result.data['userLogin']['id'];
        this.user.username = result.data['userLogin']['username'];
        this.user.email = result.data['userLogin']['email'];
        this.authenticationService.setUser(this.user);
        
        if(this.user.id != ""){
          this.authenticationService.setIsLoggedIn(true);
          this.router.navigateByUrl('/nltk', {state: {user: this.user}});
        }
      },
      error => {
        this.error = "E-mail or password incorrect !"
        console.log(error);
      }
    );
  }

  ngOnInit(): void {
  }

}
