import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})



export class AuthService {

    isAuth$ = new BehaviorSubject<boolean>(false);
    //isAuth: boolean=false;

    userId: string;
    username: string;

    constructor(private httpClient: HttpClient,
      private router: Router) {}
  
  signUp(firstname: string, lastname: string, username: string, password:string, 
        dept: string, email: string, aboutMe: string) {
      return new Promise((resolve, reject) => {
        console.log({firstname, lastname, email})
        this.httpClient.post('http://localhost:3000/api/auth/signup', {
          firstname: firstname,
          lastname: lastname,
          userName: username, 
          userPassword: password,
          service: dept,
          email: email,
          aboutMe: aboutMe
      }).subscribe(
          (response :{message: string }
            
            ) => {
            //this.userId = response.userId;
            //this.username = response.userName;
            //this.authToken = response.token;
            this.isAuth$.next(true);
            //this.isAuth=true;
            
            resolve(response);
          },
          (error) => {
            reject(error);
          }
        );
      });
    }  

  loginUser(username: string, password) {
      return new Promise((resolve, reject) => {
        console.log(username)
        this.httpClient.post('http://localhost:3000/api/auth/login', {userName: username, userPassword: password}).subscribe(
          (response :{userId: string, token: string, userName: string}
            ) => {
            this.userId = response.userId;
            this.username = response.userName;
            //this.authToken = response.token;
            this.isAuth$.next(true);
            //this.isAuth=true;
            
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      });
    }

    getUserId() {
      return this.userId;
    }

    getUserName() {
      return this.username;
    }

    logout() {
      //this.authToken = null;
      //this.userId = null;
      this.isAuth$.next(false);
      this.router.navigate(['login']);
    }
  }



  