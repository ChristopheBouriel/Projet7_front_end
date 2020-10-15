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
              console.log(error.error);
            }
          );
    }

    postComment(comment: string, username: string, postId: number, date: string) {       
        return new Promise((resolve,reject) => {
            this.httpClient
          .post('http://localhost:3000/api/comments/add', {content: comment, userName: username, postId: postId, date_comment: date})
          .subscribe(
            (response: {message: string})=> {
            console.log(response.message)
              resolve(response.message);
              this.getAllComments(postId);              
          },
          (error) => {reject(error.error);
                      console.log(error.error)})
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
              reject(error.error);
            }
          );
        })
    }

    modifyComment(comment: string, id: number, modified: number, dbDate: string, postId: number) {

        return new Promise((resolve, reject) => {
            this.httpClient
          .put('http://localhost:3000/api/comments/modify', {content: comment, commentId: id, modified: modified, date_modif: dbDate})
          .subscribe(
            (response) => {
              resolve(response);
              //this.getAllComments(postId);
                },
            (error) => {
              reject(error.error);
            }
          );
        })
    }
}