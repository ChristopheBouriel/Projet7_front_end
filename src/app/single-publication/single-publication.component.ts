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

  //title: string = 'Title';
  //date: string = 'Date';
  //content: string;
  //numberComments: number;
  likes: boolean;
  loading: boolean;
  commenting: boolean;
  //postAnchor: string;
  postId: number;
  publication: Publication;

  fromList: boolean;
  fromProfile: string;
 
  commentForm: FormGroup;
  errorMsg: string;

  constructor(private publicationService: PublicationService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private commentService: CommentService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.postId = this.route.snapshot.params['id'];

    
    console.log(this.fromList);
    console.log(this.fromProfile);
    
    this.loading = true;
    //this.publicationSubscription = 
    this.publicationService.publicationSubject.subscribe(
      (publication: Publication) => {
        this.publication = publication[0];
        //this.postAnchor = '/publications\#' + this.publication.id
        //console.log(this.postAnchor)
      }
    );
    this.publicationService.getPublicationById(+this.postId);

    this.commentForm = this.formBuilder.group({
      comment: [null, Validators.required] 
    });

    

    this.loading = false;
  }

  ngDoCheck() {
    this.fromList = this.publicationService.fromList;
    this.fromProfile = this.publicationService.fromProfile;
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

  onComment() {

    //this.loading = true;
    const comment = this.commentForm.get('comment').value;
    const userId = this.authService.getUserId();
    const username = this.authService.getUserName();
    const date = new Date().toISOString();
    const dbDate = date.split('.')[0].replace('T',' ');
    console.log(dbDate);
    this.commentService.postComment(comment, userId, username, this.postId, dbDate).then(
      (response) => {
        console.log(response);
        this.loading = false;
        this.commentForm.reset('comment');
        this.commenting = false;
      }
    ).catch(
      (error) => {
        this.loading = false;
        console.log(error);
      }
    );
  }

  onWantComment() {
    this.commenting = true;
  }

  onCancel() {
    this.commenting = false;
  }

}
