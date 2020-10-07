import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profile } from '../models/profile';
import { Subject } from 'rxjs';


@Injectable()

export class ProfileService {

    //profilesSubject = new Subject<Profile[]>();
    profileSubject = new Subject<Profile>();

    //private profiles: Profile[];
    private profile: Profile;

    constructor(private httpClient: HttpClient) { }

    //emitprofilesSubject( ) {this.profilesSubject.next(this.profiles.slice());}

    emitProfileSubject( ) {
        this.profileSubject.next(this.profile);
        console.log(this.profile);
    }

    getProfileByUserName(userName: string) {
        return new Promise((resolve, reject) => {
          this.httpClient
          .get<Profile>('http://localhost:3000/api/profiles/' + userName)
            .subscribe(
              (response: Profile) => {
                this.profile = response;
                
                console.log(this.profile)
                this.emitProfileSubject();
              },
              (error) => {
                reject(error);
              }
            );
        })
          
    }


}