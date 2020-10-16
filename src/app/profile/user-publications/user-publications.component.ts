import { Component, Input, OnInit } from '@angular/core';

import { PublicationService} from '../../services/publication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-publications',
  templateUrl: './user-publications.component.html',
  styleUrls: ['./user-publications.component.scss']
})
export class UserPublicationsComponent implements OnInit {


  @Input() publicationTitle: string;
  @Input() publicationContent: string;
  @Input() publicationDate: string;
  @Input() publicationNumberComments: number;
  @Input() publicationLikes;
  @Input() publicationUserName;
  @Input() publicationModerated;
  @Input() fromProfile;
  @Input() index: number;
  @Input() id: number;

  title: string;
  content: string;


  constructor(private publicationService: PublicationService,
              private router: Router) { }

  ngOnInit(): void {
    this.title = this.publicationTitle.replace(/&µ/gi,'\"');
    this.content = this.publicationContent.replace(/&µ/gi,'\"');
  }

  onSeePublication() {
    this.publicationService.fromListSubject.next(false);
    this.router.navigate(['publications', this.id]);
  }
}
