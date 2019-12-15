import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Article} from '../interfaces/article';
import {Tutorial} from '../interfaces/tutorial';
import {NavbarElement} from '../interfaces/navbar-element';
import {AccountService} from '../accounts/account.service';
import {doApiUrl} from '../shared/Utils';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private articlesFrom: number;
  private tutorialsFrom: number;

  constructor(private http: HttpClient, private accountService: AccountService) {
    this.articlesFrom = 0;
    this.tutorialsFrom = 10;
  }

  public loadArticleShortcuts(): Observable<Article[]> {
    const paramOffset = {
      start: String(this.articlesFrom),
    };
    this.articlesFrom += 10;
    return this.http.get<Article[]>(doApiUrl('articles'), {params: paramOffset});
  }

  public loadTutorialShortcuts(): Observable<Tutorial[]> {
    const paramOffset = {
      start: String(this.tutorialsFrom),
    };
    return this.http.get<Tutorial[]>(doApiUrl('tutorials'), {params: paramOffset});
  }

  public loadArticle(id: number): Observable<Article> {
    return this.http.get<Article>(doApiUrl(`articles/${id}`));
  }

  public loadTutorialArticle(tutorialId: number, articleId: number): Observable<Article> {
    return this.http.get<Article>(doApiUrl(`articles/${tutorialId}/${articleId}`));
  }

  public getNavbarItems(): NavbarElement[] {
    if (this.accountService.isAuthorized()) {
      return [
        {
          title: 'articles',
          asset: null
        },
        {
          title: 'tutorials',
          asset: null
        },
        {
          title: 'my articles',
          asset: null
        },
        {
          title: 'my tutorials',
          asset: null
        },
        {
          title: 'search',
          asset: 'assets/img/search.png'
        }
      ];
    } else {
      return [
        {
          title: 'articles',
          asset: null
        },
        {
          title: 'tutorials',
          asset: null
        },
        {
          title: 'search',
          asset: 'assets/img/search.png'
        }
      ];
    }
  }
}
