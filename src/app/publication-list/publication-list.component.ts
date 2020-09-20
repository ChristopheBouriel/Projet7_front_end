import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PublicationService} from '../services/publication.service';

@Component({
  selector: 'app-publication-list',
  templateUrl: './publication-list.component.html',
  styleUrls: ['./publication-list.component.scss']
})
export class PublicationListComponent implements OnInit {

  isAuth = false;

  publications: any[];
  publicationsSubscription: Subscription;

  lastUpdate = new Promise((resolve, reject) => {
    const date = new Date();
    setTimeout(
      () => {
        resolve(date);
      }, 2000
    )
  });
  
  constructor(private publicationService: PublicationService) {
    
  }

  ngOnInit() {
    this.publicationsSubscription = this.publicationService.publicationsSubject.subscribe(
      (publications:any[]) => {
        this.publications = publications;
        
      }
    );
    this.publicationService.getAllPublications();
  }
  
  ngOnDestroy() {
    this.publicationsSubscription.unsubscribe();
  }

}
