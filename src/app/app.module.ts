import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeService } from 'src/app/services/home.service';
import { GraphQLModule } from './graphql.module';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { NltkComponent } from './components/nltk/nltk.component';
import { ArticlesComponent } from './components/articles/articles.component';
import { OperationComponent } from './components/operation/operation.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: 'home', 
    component: HomeComponent
  },
  {
    path: 'login', 
    component: LoginComponent
  },
  {
    path: 'signup', 
    component: SignupComponent
  },
  {
    path: 'nltk', 
    component: NltkComponent
  },
  {
    path: 'articles', 
    component: ArticlesComponent
  },
  {
    path: 'operations', 
    component: OperationComponent,
    canActivate: [AuthGuardService]
  }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    NltkComponent,
    ArticlesComponent,
    OperationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    GraphQLModule
  ],
  exports: [
    RouterModule
  ],
  providers: [
    HomeService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
