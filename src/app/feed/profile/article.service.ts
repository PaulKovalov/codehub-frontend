import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Utils } from '../../shared/utils';
import { Article, CreateArticle } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) {
  }

  public postArticle(article: CreateArticle): Observable<Article> {
    return this.http.post<Article>(Utils.doApiUrl('articles/'), article);
  }

  public editArticle(articleId: number, updateData: any): Observable<Article> {
    return this.http.patch<Article>(Utils.doApiUrl(`articles/${articleId}/`), updateData);
  }
}
