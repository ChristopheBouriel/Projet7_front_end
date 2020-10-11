import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CommentService} from '../../services/comment.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent implements OnInit {
 
  @Input() postId: number;

  comments: any[];
  commentsSubscription: Subscription;

  
  idCom:number;

  constructor(private commentService: CommentService,
                      auth: AuthService) { }

  ngOnInit() {
    this.commentsSubscription = this.commentService.commentsSubject.subscribe(
      (comments:any[]) => {
        this.comments = comments;
        
      }
    );
    this.commentService.getAllComments(this.postId);
    
    
  }
  
  ngOnDestroy() {
    this.commentsSubscription.unsubscribe();
  }

}
  


