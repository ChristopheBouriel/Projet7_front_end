import { Component, Input, OnInit } from '@angular/core';

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
  

  constructor() { }

  ngOnInit(): void {
  }

  onLike() {
    
      if(this.publicationLikes === 0) {
        this.publicationLikes=1;
      } else {
        this.publicationLikes=0;
      }
    
    
  }

  

}
