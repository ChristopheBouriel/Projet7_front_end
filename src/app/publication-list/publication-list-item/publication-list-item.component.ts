import { Component, Input, OnInit } from '@angular/core';

import { PublicationService} from '../../services/publication.service';


import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-publication-list-item',
  templateUrl: './publication-list-item.component.html',
  styleUrls: ['./publication-list-item.component.scss']
})
export class PublicationListItemComponent implements OnInit {
  
  @Input() publicationTitle: string;
  @Input() publicationContent: string;
  @Input() publicationDate: string;
  @Input() publicationNumberComments: number;
  @Input() publicationLikes;
  @Input() publicationUserName;
  @Input() fromProfile;
  @Input() index: number;
  @Input() id: number;
  

  constructor(private publicationService: PublicationService) { }

  ngOnInit(): void {
    
  }

  onSeePublication() {
    this.publicationService.fromListSubject.next(true);
    //this.publicationService.fromList = true;
    //this.publicationService.fromProfileSubject.next(this.fromProfile);

  }

  onSeeProfile() {
    this.publicationService.fromListSubject.next(true);
  }

  //goToPublication() {this.router.navigate(['/publications', this.id], { relativeTo: this.route });}
}


// si on vient des liens des commentaires on le dit