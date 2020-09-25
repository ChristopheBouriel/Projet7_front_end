import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Comment} from '../models/comment';


@Injectable()
export class CommentService {

    commentsSubject = new Subject<Comment[]>();
    

    private comments: Comment[];
    

    constructor(private httpClient: HttpClient) { }

    emitCommentsSubject( ) {
        this.commentsSubject.next(this.comments.slice());
        
    }

    getAllComments(id: number) {
        this.httpClient
          .post<Comment[]>('http://localhost:3000/api/comments', {publicationId: id})
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

        this.httpClient
          .post('http://localhost:3000/api/comments/add', {content: comment, userId: userId, userName: username, postId: postId, date_comment: date})
          .subscribe(
            (response) => {
              console.log(response)
                },
            (error) => {
              console.log('Erreur ! : ' + error);
            }
          );

            this.getAllComments(postId);

        const d="Post ok"
        return new Promise((resolve, reject) => {
            resolve(d);
        })
    }

    deleteComment(id:number) {
        this.httpClient
          .post('http://localhost:3000/api/comments/delete', {id: id})
          .subscribe(
            (response) => {
              console.log(response)
                },
            (error) => {
              console.log('Erreur ! : ' + error);
            }
          );

          

        const c="Delete ok"
        return new Promise((resolve, reject) => {
            resolve(c);
        })
    }
}