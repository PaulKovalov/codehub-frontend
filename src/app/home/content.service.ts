import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article, ArticlePreview } from './interfaces';
import { AccountService } from '../accounts/account.service';
import { Utils } from '../shared/utils';
import { User } from '../accounts/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private articlesFrom: number;
  private tutorialsFrom: number;
  public currentUser: User | null;

  constructor(private http: HttpClient, private accountService: AccountService) {
    this.articlesFrom = 0;
    this.tutorialsFrom = 10;
  }

  public loadArticlesList(): Observable<ArticlePreview[]> {
    return this.http.get<ArticlePreview[]>(Utils.doApiUrl('articles/'));
  }

  public loadArticle(id: number): Observable<Article> {
    return this.http.get<Article>(Utils.doApiUrl(`articles/${id}/`));
  }
}
