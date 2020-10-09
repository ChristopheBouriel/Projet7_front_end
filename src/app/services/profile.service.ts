import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profile } from '../models/profile';
import { Publication} from '../models/publication';
import { Subject } from 'rxjs';


@Injectable()

export class ProfileService {

    //profilesSubject = new Subject<Profile[]>();
    profileSubject = new Subject<Profile>();
    userPublicationsSubject = new Subject<Publication[]>();

    //private profiles: Profile[];
    private profile: Profile;
    private userPublications: Publication[];

    constructor(private httpClient: HttpClient) { }

    //emitprofilesSubject( ) {this.profilesSubject.next(this.profiles.slice());}

    emitProfileSubject( ) {
        this.profileSubject.next(this.profile);
        console.log(this.profile);
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

                this.emitProfileSubject();
                this.userPublicationsSubject.next(this.userPublications);
              },
              (error) => {
                reject(error);
              }
            );
        })
          
    }


}