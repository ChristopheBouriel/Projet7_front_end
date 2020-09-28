import { Component, Input, OnInit } from '@angular/core';

import { CommentService} from '../../../services/comment.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-comment-list-item',
  templateUrl: './comment-list-item.component.html',
  styleUrls: ['./comment-list-item.component.scss']
})
export class CommentListItemComponent implements OnInit {


  @Input() commentUserName: string;
  @Input() commentContent: string;
  @Input() commentDate: string;
  @Input() modifDate: string;
  @Input() modified: number;
  @Input() index: number;
  @Input() postId: number;
  @Input() id: number;


  loading: boolean;
  errorMsg: string;
  deleted: boolean;
  isAuthor: boolean;
  modifying: boolean;
  modifyForm: FormGroup;
  initialComment: string;
  seeDate: boolean=false;


  constructor(private commentService: CommentService,
              private authService: AuthService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    if (this.commentUserName===this.authService.username) {this.isAuthor=true}
    this.modifyForm = this.formBuilder.group({
      comment: [null, Validators.required]});
      this.initialComment = this.commentContent; 
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

  
  onModify() {
    this.modifying = true;}


  onSeeDate() {
    
    if(this.seeDate===false) {
      this.seeDate = true;
      console.log(this.seeDate)
    } else
     {
      this.seeDate = false;
    }
    
  }

    
  onMakeModif() {
    
    const comment = this.modifyForm.get('comment').value;
    //const userId = this.authService.getUserId();
    //const username = this.authService.getUserName();
    const date = new Date().toISOString();
    const dbDate = date.split('.')[0].replace('T',' ');
    const modified = 1;
    this.commentService.modifyComment(comment, this.id, modified, dbDate, this.postId).then(
      (response) => {
        console.log(response);
        this.loading = false;
        
        //this.commentForm.reset('comment');
        
      }
    )
    .catch(
      (error) => {
        this.loading = false;
        console.log(error);
      }
    ).then(() => (this.commentService.getAllComments(this.postId)));
  }

  onCancel() {
    this.modifying = false;
    this.commentContent = this.initialComment;
  }

}
