import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})



export class AuthService {

    isAuth$ = new BehaviorSubject<boolean>(false);
    isAuth = false;

    userId: string='tonString';
    username: string='Snuggle';

    constructor(private httpClient: HttpClient,
      private router: Router) {}
  
    

  loginUser(username: string, password) {
      return new Promise((resolve, reject) => {
        console.log(username)
        this.httpClient.post('http://localhost:3000/api/auth/login', {userName: username, userPassword: password}).subscribe(
          (response 
            :{userId: string, token: string, userName: string}
            
            ) => {
            this.userId = response.userId;
            this.username = response.userName;
            //this.authToken = response.token;
            this.isAuth = true;
            console.log(this.isAuth$)
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
      this.isAuth = false;
      this.router.navigate(['login']);
    }

  }


  