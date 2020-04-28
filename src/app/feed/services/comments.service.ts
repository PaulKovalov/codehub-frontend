import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment, CommentsPage } from '../interfaces';
import { Utils } from '../../shared/utils';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http: HttpClient) {
  }

  public loadArticleComments(articleId: number, cursor: string | null): Observable<CommentsPage> {
    if (cursor) {
      return this.http.get<CommentsPage>(Utils.doApiUrl(`articles/${articleId}/comments/?cursor=${cursor}`));
    } else {
      return this.http.get<CommentsPage>(Utils.doApiUrl(`articles/${articleId}/comments/`));
    }
  }

  public postArticleComment(articleId: number, data: { text: string }): Observable<Comment> {
    return this.http.post<Comment>(Utils.doApiUrl(`articles/${articleId}/comments/`), data);
  }

  public likeArticleComment(articleId: number, commentId: number): Observable<string> {
    return this.http.post<string>(Utils.doApiUrl(`articles/${articleId}/comments/${commentId}/like/`), null);
  }

  public dislikeArticleComment(articleId: number, commentId: number): Observable<string> {
    return this.http.post<string>(Utils.doApiUrl(`articles/${articleId}/comments/${commentId}/dislike/`), null);
  }

  public loadTutorialArticleComments(tutorialId: number, articleId: number, cursor: string | null): Observable<CommentsPage> {
    if (cursor) {
      return this.http.get<CommentsPage>(Utils.doApiUrl(`tutorials/${tutorialId}/articles/${articleId}/comments/?cursor=${cursor}`));
    } else {
      return this.http.get<CommentsPage>(Utils.doApiUrl(`tutorials/${tutorialId}/articles/${articleId}/comments/`));
    }
  }

  public postTutorialArticleComment(tutorialId: number, articleId: number, data: { text: string }): Observable<Comment> {
    return this.http.post<Comment>(Utils.doApiUrl(`tutorials/${tutorialId}/articles/${articleId}/comments/`), data);
  }

  public likeTutorialArticleComment(tutorialId: number, articleId: number, commentId: number): Observable<string> {
    return this.http.post<string>(Utils.doApiUrl(`tutorials/${tutorialId}/articles/${articleId}/comments/${commentId}/like/`), null);
  }

  public dislikeTutorialArticleComment(tutorialId: number, articleId: number, commentId: number): Observable<string> {
    return this.http.post<string>(Utils.doApiUrl(`tutorials/${tutorialId}/articles/${articleId}/comments/${commentId}/dislike/`), null);
  }

  public editArticleComment(articleId: number, commentId: number, data: { text: string }): Observable<Comment> {
    return this.http.patch<Comment>(Utils.doApiUrl(`articles/${articleId}/comments/${commentId}/`), data);
  }

  public editTutorialArticleComment(tutorialId: number, articleId: number, commentId: number, data: { text: string }): Observable<Comment> {
    return this.http.patch<Comment>(Utils.doApiUrl(`tutorials/${tutorialId}/articles/${articleId}/comments/${commentId}/`), data);
  }
}
