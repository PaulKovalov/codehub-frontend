import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Article} from '../interfaces/article';
import {Tutorial} from '../interfaces/tutorial';
import {NavbarElement} from '../interfaces/navbar-element';
import {AccountService} from '../accounts/account.service';
import {doApiUrl} from '../shared/Utils';
import {User} from '../interfaces/user-data';

const nonAuthorizedNavbarSet: NavbarElement[] = [
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

const authorizedNavbarSet: NavbarElement[] = [...nonAuthorizedNavbarSet, ...[
  {
    title: 'my articles',
    asset: null
  },
  {
    title: 'my tutorials',
    asset: null
  },
]
];


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

  public getNavbarItems(): Subject<NavbarElement[]> {
    const navbarSubject = new Subject<NavbarElement[]>();
    this.accountService.me().subscribe((data) => {
      this.currentUser = data;
      navbarSubject.next(authorizedNavbarSet);
    }, (err) => {
      navbarSubject.next(nonAuthorizedNavbarSet);
    });
    return navbarSubject;
  }
}
