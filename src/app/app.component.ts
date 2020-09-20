import { Component, OnDestroy, OnInit } from '@angular/core';
import { PublicationService } from './services/publication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Front-end';

  
  publicationSubscription: Subscription;

  constructor(private publicationService: PublicationService) {
    
  }

  ngOnInit(): void {

  }
  
}
