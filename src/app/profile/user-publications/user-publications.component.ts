import { Component, Input, OnInit } from '@angular/core';

import { PublicationService} from '../../services/publication.service';


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
  @Input() fromProfile;
  @Input() index: number;
  @Input() id: number;

  title: string;
  content: string;


  constructor(private publicationService: PublicationService) { }

  ngOnInit(): void {
    this.title = this.publicationTitle.replace(/&µ/gi,'\"');
    this.content = this.publicationContent.replace(/&µ/gi,'\"');
  }

  onGoToPublication() {
    this.publicationService.fromListSubject.next(false);
  }
}
