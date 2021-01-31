import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article, ArticlePreview, ArticlesPage, TableOfContentItem, Tutorial, TutorialArticle, TutorialArticlesPage, TutorialsPage } from '../interfaces';
import { Utils } from '../../shared/utils';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  constructor(private http: HttpClient) {
  }

  public loadArticlesList(cursor: string | null, my: string = ''): Observable<ArticlesPage> {
    const startUrl = `articles/${my}`;
    if (cursor) {
      return this.http.get<ArticlesPage>(Utils.doApiUrl(`${startUrl}?cursor=${cursor}`));
    } else {
      return this.http.get<ArticlesPage>(Utils.doApiUrl(startUrl));
    }
  }

  public loadTutorialsList(cursor: string | null, my: string = ''): Observable<TutorialsPage> {
    const startUrl = `tutorials/${my}`;
    if (cursor) {
      return this.http.get<TutorialsPage>(Utils.doApiUrl(`${startUrl}?cursor=${cursor}`));
    } else {
      return this.http.get<TutorialsPage>(Utils.doApiUrl(startUrl));
    }
  }

  public loadTutorialArticlesList(tutorialId: number, cursor: string | null): Observable<TutorialArticlesPage> {
    const startUrl = `tutorials/${tutorialId}/articles`;
    if (cursor) {
      return this.http.get<TutorialArticlesPage>(Utils.doApiUrl(`${startUrl}?cursor=${cursor}`));
    } else {
      return this.http.get<TutorialArticlesPage>(Utils.doApiUrl(startUrl));
    }
  }

  public loadRecentArticles(): Observable<ArticlePreview[]> {
    return this.http.get<ArticlePreview[]>(Utils.doApiUrl('articles/recent/'));
  }

  public loadRecentTutorials(): Observable<Tutorial[]> {
    return this.http.get<Tutorial[]>(Utils.doApiUrl('tutorials/recent/'));
  }

  public loadArticle(id: number): Observable<Article> {
    return this.http.get<Article>(Utils.doApiUrl(`articles/${id}/`));
  }

  public myArticlesCount(): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(Utils.doApiUrl('articles/my/count/'));
  }

  public myArticlesIds(): Observable<[number]> {
    return this.http.get<[number]>(Utils.doApiUrl('articles/my/ids'));
  }

  public loadTutorialsTableOfContent(tutorialId: number): Observable<TableOfContentItem[]> {
    return this.http.get<TableOfContentItem[]>(Utils.doApiUrl(`tutorials/${tutorialId}/articles/table-of-content/`));
  }

  public loadTutorialArticle(tutorialId: number, articleId: number): Observable<TutorialArticle> {
    return this.http.get<TutorialArticle>(Utils.doApiUrl(`tutorials/${tutorialId}/articles/${articleId}/`));
  }

  public loadTutorial(tutorialId: number): Observable<Tutorial> {
    return this.http.get<Tutorial>(Utils.doApiUrl(`tutorials/${tutorialId}/`));
  }

  public myTutorialsIds(): Observable<[number]> {
    return this.http.get<[number]>(Utils.doApiUrl('tutorials/my/ids'));
  }

  public likeArticle(articleId: number): Observable<string> {
    return this.http.post<string>(Utils.doApiUrl(`articles/${articleId}/like/`), null);
  }

  public dislikeArticle(articleId: number): Observable<string> {
    return this.http.post<string>(Utils.doApiUrl(`articles/${articleId}/dislike/`), null);
  }

  public likeTutorialArticle(tutorialId: number, articleId: number): Observable<string> {
    return this.http.post<string>(Utils.doApiUrl(`tutorials/${tutorialId}/articles/${articleId}/like/`), null);
  }

  public dislikeTutorialArticle(tutorialId: number, articleId: number): Observable<string> {
    return this.http.post<string>(Utils.doApiUrl(`tutorials/${tutorialId}/articles/${articleId}/dislike/`), null);
  }

  public getErrorMessages(): Observable<string> {
    return this.http.get<[{ message: string }]>(Utils.doApiUrl('errors/')).pipe(map(data => {
      if (data.length) {
        return data[0].message;
      }
      return '';
    }));
  }
}
