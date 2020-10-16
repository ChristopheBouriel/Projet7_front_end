import { Component, Input, OnInit } from '@angular/core';

import { PublicationService} from '../../services/publication.service';
import { AuthService} from '../../services/auth.service';


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
  @Input() publicationModerated: number;
  @Input() fromProfile;
  @Input() index: number;
  @Input() id: number;
  
  content: string;
  title: string;
  moderator: boolean;
  //moderated: boolean;

  constructor(private publicationService: PublicationService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.content = this.publicationContent.replace(/&µ/gi,'\"');
    this.title = this.publicationTitle.replace(/&µ/gi,'\"');

    this.authService.isAdmin$.subscribe(
      (isAdmin) => {
        this.moderator = isAdmin;
      }
    )
    
    
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