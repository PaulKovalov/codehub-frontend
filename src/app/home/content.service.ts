import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article, ArticlesPage } from './interfaces';
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

  public loadArticlesList(cursor: string | null): Observable<ArticlesPage> {
    if (cursor) {
      return this.http.get<ArticlesPage>(Utils.doApiUrl('articles/?cursor=' + cursor));
    } else {
      return this.http.get<ArticlesPage>(Utils.doApiUrl('articles/'));
    }
  }

  public loadArticle(id: string | number): Observable<Article> {
    return this.http.get<Article>(Utils.doApiUrl(`articles/${id}/`));
  }
}
