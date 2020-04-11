import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article, ArticlePreview, ArticlesPage } from '../interfaces';
import { Utils } from '../../shared/utils';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private http: HttpClient) {
  }

  public loadArticlesList(cursor: string | null, my: string = ''): Observable<ArticlesPage> {
    const startUrl = `articles/${my}`;
    if (cursor) {
      return this.http.get<ArticlesPage>(Utils.doApiUrl(`${startUrl}?cursor=cursor`));
    } else {
      return this.http.get<ArticlesPage>(Utils.doApiUrl(startUrl));
    }
  }

  public loadRecentArticles(): Observable<ArticlePreview> {
    return this.http.get<ArticlePreview>(Utils.doApiUrl('articles/recent/'));
  }

  public loadRecentTutorials(): Observable<ArticlePreview> {
    return this.http.get<ArticlePreview>(Utils.doApiUrl('tutorials/recent/'));
  }

  public loadArticle(id: string | number): Observable<Article> {
    return this.http.get<Article>(Utils.doApiUrl(`articles/${id}/`));
  }
}
