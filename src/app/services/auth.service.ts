import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})



export class AuthService {

    isAuth$ = new BehaviorSubject<boolean>(false);
    userName$ = new BehaviorSubject<string>('No one is connected');
    headMessage$ = new BehaviorSubject<string>('');
    //isAuth: boolean=false;

    userId: string;
    userName: string;

    signupMessage: string;

    constructor(private httpClient: HttpClient,
                private router: Router) {}

                clearMessage() {
                  setTimeout(
                    () => {
                      this.headMessage$.next('');
                    }, 2000
                  )
                ;
                
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
              if (response.message !== 'User already exists') {
                this.isAuth$.next(true);
                resolve(response.message);
                //this.userId = response.userId;
                //this.userName = response.userName;
                //this.authToken = response.token;
              }
              else {
                this.signupMessage = response.message;
                resolve(response.message);
              };          
          },
          (error) => {
            reject(error);
          }
        );
      });
    }  

  loginUser(userName: string, password) {
      return new Promise((resolve, reject) => {
        
        this.httpClient.post('http://localhost:3000/api/auth/login', {userName: userName, userPassword: password}).subscribe(
          (response :{userId: string, token: string, userName: string}
            ) => {
            this.userId = response.userId;
            this.userName = response.userName;
            this.emitUserNameSubject();
            console.log(this.userName$)
            //this.authToken = response.token;
            this.isAuth$.next(true);
            //this.isAuth=true;
            
            resolve();
          },
          (error) => {
            reject(error.error);
          }
        );
      });
    }

    getUserId() {
      return this.userId;
    }

    getUserName() {
      
      return this.userName;
      //souscrire au subject ici -- ce sera peut-être suffisant
    }

    modifyPassword(password: string, email: string) {

      return new Promise((resolve, reject) => {

        this.httpClient.post('http://localhost:3000/api/auth/changeP', {
          userPassword: password,
          email: email          
      }).subscribe(
          (response :{message: string }
            
            ) => {
            resolve(response);
          },
          (error) => {
            reject(error);
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
            console.log(response)
            if (response.message !== 'User already exists') {
              resolve(response.message);
            } else {
                this.signupMessage = response.message;
                resolve(response.message);}
        },
        (error) => {
          reject(error);
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
            reject(error);
          }
        );
      })
    }

    logout() {
      //this.authToken = null;
      //this.userId = null;
      this.isAuth$.next(false);
      this.router.navigate(['login']);
    }
  }



  