import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Utils } from '../../shared/utils';
import { CreateArticle } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) {
  }

  public postArticle(article: CreateArticle): Observable<void> {
    return this.http.post<void>(Utils.doApiUrl('articles/'), article);
  }

  public editArticle(articleId: number, updateData: any): Observable<void> {
    return this.http.patch<void>(Utils.doApiUrl(`articles/${articleId}/`), updateData);
  }
}
