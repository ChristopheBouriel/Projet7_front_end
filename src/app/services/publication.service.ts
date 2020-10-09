import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Publication } from '../models/publication';
import { Subject } from 'rxjs';


@Injectable()
export class PublicationService {

    publicationsSubject = new Subject<Publication[]>();
    publicationSubject = new Subject<Publication>();

    private publications: Publication[];
    private publication: Publication;

    lastSeen: number;
    fromList: boolean;
    fromProfile: string;

    constructor(private httpClient: HttpClient) { }

    emitPublicationsSubject( ) {
        this.publicationsSubject.next(this.publications.slice());
        
    }

    emitPublicationSubject( ) {
        this.publicationSubject.next(this.publication);
        console.log(this.publication);
    }

    getAllPublications() {
        this.httpClient
          .get<Publication[]>('http://localhost:3000/api/publications')
          .subscribe(
            (response) => {
              this.publications = response;
              console.log(this.publications)
              this.emitPublicationsSubject();
            },
            (error) => {
              console.log('Erreur ! : ' + error);
            }
          );
    }

    getPublicationById(id: number) {
      this.lastSeen = id;
      return new Promise((resolve, reject) => {
        this.httpClient
        .get<Publication>('http://localhost:3000/api/publications/' + id)
          .subscribe(
            (response: Publication) => {
              this.publication = response;
              
              console.log(this.publication)
              this.emitPublicationSubject();
            },
            (error) => {
              reject(error);
            }
          );
      })
        
    }
}