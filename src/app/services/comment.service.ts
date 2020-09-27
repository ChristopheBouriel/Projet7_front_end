import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Comment} from '../models/comment';
import { Router } from '@angular/router';


@Injectable()
export class CommentService {

    commentsSubject = new Subject<Comment[]>();
    

    private comments: Comment[];
    

    constructor(private httpClient: HttpClient,
                private router: Router) { }

    emitCommentsSubject( ) {
        this.commentsSubject.next(this.comments.slice());
        
    }

    getAllComments(postId: number) {
        this.httpClient
          .post<Comment[]>('http://localhost:3000/api/comments', {publicationId: postId})
          .subscribe(
            (response) => {
              this.comments = response;
              console.log(this.comments)
              this.emitCommentsSubject();
            },
            (error) => {
              console.log('Erreur ! : ' + error);
            }
          );
    }

    postComment(comment: string, userId: string, username: string, postId: number, date: string) {
        console.log({comment, userId, postId, date})

        return new Promise((resolve,reject) => {
            this.httpClient
          .post('http://localhost:3000/api/comments/add', {content: comment, userId: userId, userName: username, postId: postId, date_comment: date})
          .subscribe((response)=> {
              resolve(response);
              this.getAllComments(postId);
          }),
          (error) => {reject(error);}
        })
    }

    deleteComment(id:number, publication:number) {

        return new Promise((resolve, reject) => {
            this.httpClient
          .post('http://localhost:3000/api/comments/delete', {id: id, postId: publication})
          .subscribe(
            (response) => {
              resolve(response)
                },
            (error) => {
              reject(error);
            }
          );
        })
    }
}