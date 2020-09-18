import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';


@Injectable()
export class PublicationService {

    publicationsSubject = new Subject<any>();

    private publications = [];
    constructor(private httpClient: HttpClient) { }

    emitPublicationSubject( ) {
        this.publicationsSubject.next(this.publications.slice());
    }

    getAllPublications() {
        this.httpClient
          .get<any[]>('http://localhost:3000/api/publications')
          .subscribe(
            (response) => {
              this.publications = response;
              console.log(this.publications)
              this.emitPublicationSubject();
            },
            (error) => {
              console.log('Erreur ! : ' + error);
            }
          );
    }
}