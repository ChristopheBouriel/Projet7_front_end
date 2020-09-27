import { Component, Input, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { CommentService} from '../../../services/comment.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

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
  @Input() postId: number;
  @Input() id: number;


  loading: boolean;
  errorMsg: string;
  deleted: boolean;
  isAuthor: boolean;
  constructor(private commentService: CommentService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    if (this.commentUserName===this.authService.username) {this.isAuthor=true}
  }

  onDelete() {
    
    const publication = this.postId;
    console.log(publication);
    this.commentService.deleteComment(this.id, publication).then(
      (response) => {
        console.log(response)
        this.loading = false;
        this.deleted = true;
        //this.router.navigate(['publications', this.id]);
      }
    ).catch(
      (error) => {
        this.loading = false;
        this.errorMsg = error.message;
      }
    );
  }

  
  

}
