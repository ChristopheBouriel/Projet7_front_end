import { Component, Input, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { CommentService} from '../../../services/comment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comment-list-item',
  templateUrl: './comment-list-item.component.html',
  styleUrls: ['./comment-list-item.component.scss']
})
export class CommentListItemComponent implements OnInit {


  @Input() commentUserName: string;
  @Input() commentContent: string;
  @Input() commentDate: string;
  @Input() index: number;
  @Input() id: number;


  loading: boolean;
  errorMsg: string;
  deleted: boolean;
  constructor(private commentService: CommentService,
              private router: Router) { }

  ngOnInit(): void {
    
  }

  onDelete() {
    
    this.commentService.deleteComment(this.id).then(
      (c) => {
        console.log(c)
        this.loading = false;
        this.deleted = true;
        this.router.navigate(['publications', this.id]);
      }
    ).catch(
      (error) => {
        this.loading = false;
        this.errorMsg = error.message;
      }
    );
  }

  
  

}
