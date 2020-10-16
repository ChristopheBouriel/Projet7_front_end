import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

    isAuth$ = new BehaviorSubject<boolean>(false);
    isAdmin$ = new BehaviorSubject<boolean>(false);
    userName$ = new BehaviorSubject<string>('No one is connected');
    headMessage$ = new BehaviorSubject<string>('');
    
    private userName: string;
    private authToken: string;

    constructor(private httpClient: HttpClient,
                private router: Router) {}

  clearMessage() {
      setTimeout(
        () => {this.headMessage$.next('');}, 4000);
    }

  emitUserNameSubject( ) {
        this.userName$.next(this.userName);
        console.log(this.userName);
    }
  
  signUp(firstname: string, lastname: string, userName: string, password:string, 
        dept: string, email: string, aboutMe: string) {
      return new Promise((resolve, reject) => {
        console.log({firstname, lastname, email})
        this.httpClient.post('http://localhost:3000/api/auth/signup', {
          firstname: firstname,
          lastname: lastname,
          userName: userName, 
          userPassword: password,
          service: dept,
          email: email,
          aboutMe: aboutMe
      }).subscribe(
          (response :{message: string }) => {              
              resolve(response.message);       
          },
          (error) => {
            reject(error.error);
          }
        );
      });
    }  

  loginUser(userName: string, password) {
      return new Promise((resolve, reject) => {
        this.httpClient.post('http://localhost:3000/api/auth/login', {userName: userName, userPassword: password}).subscribe(
          (response :{admin: number, token: string, userName: string}
            ) => {
            this.userName = response.userName;
            const checkAdmin = response.admin;
            console.log(checkAdmin)
            if (checkAdmin===1) {
              this.isAdmin$.next(true);
            }
            this.emitUserNameSubject();
            console.log(this.userName$)
            this.authToken = response.token;
            this.isAuth$.next(true);            
            resolve();
          },
          (error) => {
            reject(error.error);
          }
        );
      });
    }

    getToken() {
      return this.authToken;
    }

    getUserName() {
      this.userName$.subscribe(
        (userName) => {
          this.userName = userName;
        }
      )
      return this.userName;
    }

    modifyPassword(password: string, email: string) {
      return new Promise((resolve, reject) => {
        this.httpClient.post('http://localhost:3000/api/auth/changeP', {
          userPassword: password,
          email: email          
      }).subscribe(
          (response :{message: string }) => {
            resolve(response);
          },
          (error) => {
            reject(error.error);
          }
        );
      })
    }
    
    modifyUserName(userName: string, email: string) {
      return new Promise((resolve, reject) => {
        this.httpClient.post('http://localhost:3000/api/auth/changeU', {
          userName: userName,
          email: email          
      }).subscribe(
        (response :{message: string }) => {
                resolve(response.message);
        },
        (error) => {
          reject(error.error);
        }
      );
    })
  }

    deleteAccount(userName: string) {
      return new Promise((resolve, reject) => {
        this.httpClient.post('http://localhost:3000/api/auth/deleteU', {userName: userName }).subscribe(
          (response :{message: string }) => {
            resolve(response);
          },
          (error) => {
            reject(error.error);
          }
        );
      })
    }

    logout() {
      //this.authToken = null;      
      this.isAuth$.next(false);
      this.isAdmin$.next(false);
      this.router.navigate(['login']);
    }
  }
  