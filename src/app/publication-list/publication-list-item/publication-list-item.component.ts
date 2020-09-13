import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-publication-list-item',
  templateUrl: './publication-list-item.component.html',
  styleUrls: ['./publication-list-item.component.scss']
})
export class PublicationListItemComponent implements OnInit {
  
  @Input() publicationName: string;

  constructor() { }

  ngOnInit(): void {
  }

}
