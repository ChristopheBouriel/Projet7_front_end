import { Component, OnInit } from '@angular/core';
import { PublicationService} from '../services/publication.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-single-publication',
  templateUrl: './single-publication.component.html',
  styleUrls: ['./single-publication.component.scss']
})
export class SinglePublicationComponent implements OnInit {

  //title: string = 'Title';
  date: string = 'Date';
  content: string;
  numberComments: number;
  likes: number;

  
  publication: any;
 
  //publicationSubscription: Subscription;

  constructor(private publicationService: PublicationService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    

    //this.publicationSubscription = 
    this.publicationService.publicationSubject.subscribe(
      (publication: any) => {
        this.publication = publication[0];
        console.log(publication)
      }
    );
    this.publicationService.getPublicationById(+id);
  }

  onLike() {
    const id = this.route.snapshot.params['id'];
    if(this.likes === 0) {
      this.likes=1;
      //this.publicationService.getPublicationById(+id).likes = 1;
    } else {
      this.likes=0;
      //this.publicationService.getPublicationById(+id).likes = 0;
    }
  
  
}

}
