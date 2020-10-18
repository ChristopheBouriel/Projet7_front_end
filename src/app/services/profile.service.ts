import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profile } from '../models/profile';
import { Publication} from '../models/publication';
import { Subject, BehaviorSubject, EmptyError } from 'rxjs';


@Injectable()

export class ProfileService {

    //profilesSubject = new Subject<Profile[]>();
    profileSubject = new Subject<Profile>();
    userPublicationsSubject = new Subject<Publication[]>();
    notificationsSubject = new Subject<Notification[]>();
    usersListSubject = new Subject();
    searchingSubject = new BehaviorSubject(false);

    //private profiles: Profile[];
    private profile: Profile;
    private notifications: Notification[];
    private userPublications: Publication[];
    //fromUsersList: boolean;

    seeMine: boolean;

    constructor(private httpClient: HttpClient) { }

    //emitprofilesSubject( ) {this.profilesSubject.next(this.profiles.slice());}

    emitProfileSubject( ) {
        this.profileSubject.next(this.profile);
        console.log(this.profile);
    }

    emitNotificationsSubject( ) {
      this.notificationsSubject.next(this.notifications.slice());
      console.log(this.notifications.slice())
  }

    getProfileByUserName(userName: string) {
        return new Promise((resolve, reject) => {
          this.httpClient
          .get('http://localhost:3000/api/profiles/' + userName)
            .subscribe(
              (response) => {
                const resp = Object.values(response);
                this.profile = resp[0];                
                console.log(this.profile);
                this.userPublications = resp[1];
                console.log(this.userPublications);
                resolve(this.profile);
                this.emitProfileSubject();
                this.userPublicationsSubject.next(this.userPublications);
              },
              (error) => {
                reject(error);
              }
            );
        })
    }

  getUsersList() {
    return new Promise((resolve, reject) => {
        this.httpClient
          .get('http://localhost:3000/api/auth/list')
          .subscribe(
            (response) => {
              this.usersListSubject.next(response);
              resolve()
            },
            (error) => {
              reject(error);
            }
          );
    })
    }

  modifyProfile(firstname: string, lastname: string, userName: string, 
  dept: string, email: string, aboutMe: string) {
      return new Promise((resolve, reject) => {
        this.httpClient.put('http://localhost:3000/api/profiles/modify', {
          firstname: firstname,
          lastname: lastname,
          userName: userName,
          service: dept,
          email: email,
          aboutMe: aboutMe
      }).subscribe(
    (response :{message: string }
      ) => {
      resolve(response.message);
    },
    (error) => {
      reject(error.error);
    }
  );
  });
    }

  getNews(userName: string) {
    return new Promise((resolve, reject) => {
    this.httpClient
          .get<Notification[]>('http://localhost:3000/api/profiles/notifications/' + userName)
          .subscribe(
            (response: Notification[]) => {
              this.notifications = response;
              this.emitNotificationsSubject();
              console.log(this.notifications)
              resolve();
            },
            (error) => {
              
              reject(error);
            }
          );
    });
  }


}