import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Publication } from '../models/publication';
import { Subject, BehaviorSubject } from 'rxjs';


@Injectable()
export class PublicationService {

    publicationsSubject = new Subject<Publication[]>();
    publicationSubject = new Subject<Publication>();
    fromProfileSubject = new BehaviorSubject<string>('');
    fromPostSubject = new Subject<number>();
    fromListSubject = new BehaviorSubject<boolean>(true);

    private publications: Publication[];
    private publication: Publication;
    lastSeenInList: number;

    //fromList: boolean;
    fromPost: number;
    fromProfile: string;

    constructor(private httpClient: HttpClient) { }

    emitPublicationsSubject( ) {
        this.publicationsSubject.next(this.publications.slice());
    }

    emitPublicationSubject( ) {
        this.publicationSubject.next(this.publication);
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
      this.lastSeenInList = id;
      return new Promise((resolve, reject) => {
        this.httpClient
        .get<Publication>('http://localhost:3000/api/publications/' + id)
          .subscribe(
            (response: Publication) => {
              this.publication = response;
              this.emitPublicationSubject();
            },
            (error) => {
              reject(error);
            }
          );
      })
    }
}