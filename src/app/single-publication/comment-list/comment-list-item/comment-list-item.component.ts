import { Component, Input, OnInit } from '@angular/core';

import { CommentService} from '../../../services/comment.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { PublicationService} from '../../../services/publication.service';

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
  exOne: boolean;
  modifying: boolean;
  confirm: boolean;
  modifyForm: FormGroup;
  initialComment: string;
  seeDate: boolean=false;


  constructor(private commentService: CommentService,
              private publicationService: PublicationService,
              private authService: AuthService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    const userName = this.authService.getUserName();
    if (this.commentUserName === userName) {this.isAuthor = true}
    this.modifyForm = this.formBuilder.group({
      comment: [this.commentContent.replace(/&µ/gi,'\"'), Validators.required]});
      this.initialComment = this.commentContent.replace(/&µ/gi,'\"'); 

      console.log(this.postId);
      this.publicationService.fromPost = this.postId;

    if (this.commentUserName === 'utilisateur désinscrit') {
      this.exOne = true;
    }
      
  }

  onWantDelete() {
    this.confirm = true;
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

  onCancelModif() {
    this.modifying = false;
    this.commentContent = this.initialComment;
    this.modifyForm.patchValue({comment: this.initialComment});
  }


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

  onSeeProfile() {
    this.publicationService.fromListSubject.next(false);
    console.log('Ici')
  }

}
