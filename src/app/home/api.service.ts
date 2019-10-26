import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Article} from '../interfaces/article';
import {Tutorial} from '../interfaces/tutorial';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private articlesFrom: number;
  private tutorialsFrom: number;
  private BASE_URL = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
    this.articlesFrom = 0;
    this.tutorialsFrom = 10;
  }

  public loadArticleShortcuts(): Observable<Article[]> {
    const paramOffset = {
      start: String(this.articlesFrom),
    };
    this.articlesFrom += 10;
    return this.http.get<Article[]>(this.doUrl('articles'), {params: paramOffset});
  }

  public loadTutorialShortcuts(): Observable<Tutorial[]> {
    const paramOffset = {
      start: String(this.tutorialsFrom),
    };
    return this.http.get<Tutorial[]>(this.doUrl('tutorials'), {params: paramOffset});
  }

  public loadArticle(id: number): Observable<Article> {
    return this.http.get<Article>(this.doUrl('articles/' + id));
  }

  public loadTutorialArticle(tutorialId: number, articleId: number): Observable<Article> {
    return this.http.get<Article>(this.doUrl('articles/' + tutorialId + '/' + articleId));
  }

  private doUrl(path: string) {
    return `${this.BASE_URL}${path}`;
  }
}
