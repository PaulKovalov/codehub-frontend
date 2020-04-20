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
}
