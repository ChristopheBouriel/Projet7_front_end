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
  likes = 0;
  loading: boolean;
  //postAnchor: string;
  id: number;

  publication: Publication;
  
 
  commentForm: FormGroup;
  errorMsg: string;

  //publicationSubscription: Subscription;

  constructor(private publicationService: PublicationService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private commentService: CommentService,
              private authService: AuthService,
              private router: Router
              ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    
    this.loading = true;
    //this.publicationSubscription = 
    this.publicationService.publicationSubject.subscribe(
      (publication: Publication) => {
        this.publication = publication[0];
        //this.postAnchor = '/publications\#' + this.publication.id
        //console.log(this.postAnchor)
      }
    );
    this.publicationService.getPublicationById(+this.id);

    this.commentForm = this.formBuilder.group({
      comment: [null, Validators.required]
      
    });

    this.loading = false;
  }

  onLike() {
    const id = this.route.snapshot.params['id'];
    if(this.likes === 0) {
      this.likes=1;
      //this.publicationService.getPublicationById(+id).likes = 1;
    } else {
      this.likes=0;
      //this.publicationService.getPublicationById(+id).likes = 0;
    }
  
  }

  onComment() {

    this.loading = true;
    const comment = this.commentForm.get('comment').value;
    const userId = this.authService.getUserId();
    const username = this.authService.getUserName();
    const date = new Date().toISOString();
    const dbDate = date.split('.')[0].replace('T',' ');
    console.log(dbDate);
    this.commentService.postComment(comment, userId, username, this.id, dbDate).then(
      (d) => {
        console.log(d)
        this.loading = false;
        this.commentForm.reset('comment');
      }
    ).catch(
      (error) => {
        this.loading = false;
        this.errorMsg = error.message;
      }
    );
  }

}