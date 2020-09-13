import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-publication-list-item',
  templateUrl: './publication-list-item.component.html',
  styleUrls: ['./publication-list-item.component.scss']
})
export class PublicationListItemComponent implements OnInit {
  
  @Input() publicationName: string;
  @Input() publicationContent: string;
  @Input() publicationDate: string;

  @Input() publicationLike;
  @Input() publicationDislike;

  constructor() { }

  ngOnInit(): void {
  }

  onLike() {
    if(this.publicationDislike === false) {
      if(this.publicationLike === false) {
        this.publicationLike=true;
      } else {
        this.publicationLike=false;
      }
    }
    
  }

  onDislike() {
    if(this.publicationLike === false) {
      if(this.publicationDislike === false) {
        this.publicationDislike=true;
      } else {
        this.publicationDislike=false;
      }
      
    }
  }

}
