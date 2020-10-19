import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss']
})
export class AdminListComponent implements OnInit {

  @Input() id: number;
  @Input() moderated: number;
  @Input() title: string;
  @Input() postId: string;
  @Input() commentId: string;
  @Input() titlePost: string;

  constructor() { }

  ngOnInit(): void {
  }

}
