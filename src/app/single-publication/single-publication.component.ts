import { Component, OnInit } from '@angular/core';
import { PublicationService} from '../services/publication.service';
import { ActivatedRoute } from '@angular/router';
import { Publication } from '../models/publication';
import { CommentService } from '../services/comment.service'
import { Subscription } from 'rxjs';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-single-publication',
  templateUrl: './single-publication.component.html',
  styleUrls: ['./single-publication.component.scss']
})
export class SinglePublicationComponent implements OnInit {

  title: string;
  //date: string = 'Date';
  content: string;
  //numberComments: number;
  likes: boolean;
  loading: boolean;
  commenting: boolean;
  modifying: boolean;
  confirm: boolean;
  isAuthor: boolean;
  initialTitle: string;
  initialContent: string;
  seeDate: boolean=false;
  

  //postAnchor: string;
  postId: number;
  publication: Publication;

  fromList: boolean;
  fromProfile: string;
 
  commentForm: FormGroup;
  modifyForm: FormGroup;
  errorMsg: string;

  constructor(private publicationService: PublicationService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private commentService: CommentService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.loading = true;
    this.postId = this.route.snapshot.params['id'];
    
    this.publicationService.publicationSubject.subscribe(
      (publication: Publication) => {
        this.publication = publication[0];
        this.content = publication[0].content.replace(/&µ/gi,'\"');
        this.title = publication[0].title.replace(/&µ/gi,'\"');
        //this.postAnchor = '/publications\#' + this.publication.id
        //console.log(this.postAnchor)
      }
    );
    this.publicationService.getPublicationById(+this.postId).then(
      (response: any[]) => {
        const userName = this.authService.getUserName();
        if (response[0].userName === userName) {this.isAuthor = true}
        console.log(response)
        this.initialTitle = response[0].title.replace(/&µ/gi,'\"');
        this.initialContent = response[0].content.replace(/&µ/gi,'\"');
        this.modifyForm = this.formBuilder.group({
          title: [this.initialTitle, Validators.required],
          publication: [this.initialContent, Validators.required],
        });
      }
    );


    this.commentForm = this.formBuilder.group({
      comment: [null, Validators.required] 
    });

    this.publicationService.fromListSubject.subscribe(
      (fromList:boolean) => {
        this.fromList = fromList;
      })
    console.log(this.fromList)

    this.publicationService.fromProfileSubject.subscribe(
    (fromProfile) => {  this.fromProfile = fromProfile});

    //this.publicationService.fromListSubject.next(true);
    this.loading = false;
  }

  ngDoCheck() {
    
    //this.publicationService.fromProfileSubject.next(this.authService.getUserName());
  }

  onLike() {
    //const id = this.route.snapshot.params['id'];
    if(this.likes === false) {
      this.likes=true;
      //this.publicationService.getPublicationById(+id).likes = 1;
    } else {
      this.likes=false;
      //this.publicationService.getPublicationById(+id).likes = 0;
    }
    console.log(this.likes)
  
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

  onComment() {

    this.loading = true;
    const comment = this.commentForm.get('comment').value;
    const username = this.authService.getUserName();
    const date = new Date().toISOString();
    const dbDate = date.split('.')[0].replace('T',' ');
    console.log(dbDate);
    this.commentService.postComment(comment, username, this.postId, dbDate).then(
      (response) => {
        console.log(response);
        this.loading = false;
        this.commentForm.reset('comment');
        this.commenting = false;
        this.errorMsg = '';
      }
    ).catch(
      (error) => {
        this.loading = false;
        this.errorMsg = error.message;        
      }
    );
  }

  onWantComment() {
    this.commenting = true;
  }

  onCancel() {
    this.commenting = false;
    this.modifying = false;
    this.errorMsg = '';
    this.commentForm.reset('comment');
  }

  onWantModify() {
    this.modifying = true;
  }

  onWantDelete() {
    this.confirm = true;
  }

  onCancelDelete() {
    this.confirm = false;
  }

  onCancelModif() {
    this.modifying = false;
    this.modifyForm.patchValue({title: this.initialTitle, publication: this.initialContent});
  }

  onMakeModif() {
    const title = this.modifyForm.get('title').value;
    const content = this.modifyForm.get('publication').value;
    //const userId = this.authService.getUserId();
    //const username = this.authService.getUserName();
    const date = new Date().toISOString();
    const dbDate = date.split('.')[0].replace('T',' ');
    const modified = 1;
    this.publicationService.modifyPublication(content, title, modified, dbDate, this.postId).then(
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
    ).then(() => {this.publicationService.getPublicationById(this.postId);
                  this.modifying = false;})
  }

  onDelete() {
    const userName = this.authService.getUserName();
    const publication = this.postId;
    console.log(publication);
    this.publicationService.deletePublication( publication, userName).then(
      (response) => {
        console.log(response)
        this.loading = false;
        this.router.navigate(['publications']);
        //this.deleted = true;
        
      }
    ).catch(
      (error) => {
        this.loading = false;
        this.errorMsg = error.message;
      }
    );
  }

  onSeeProfile() {
    this.publicationService.fromListSubject.next(false);
    console.log('Ici')
  }

}
