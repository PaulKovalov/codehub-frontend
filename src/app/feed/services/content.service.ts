import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article, ArticlePreview, ArticlesPage, TableOfContentItem, Tutorial, TutorialArticle, TutorialsPage } from '../interfaces';
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

  public loadRecentArticles(): Observable<ArticlePreview[]> {
    return this.http.get<ArticlePreview[]>(Utils.doApiUrl('articles/recent/'));
  }

  public loadRecentTutorials(): Observable<ArticlePreview> {
    return this.http.get<ArticlePreview>(Utils.doApiUrl('tutorials/recent/'));
  }

  public loadArticle(id: string | number): Observable<Article> {
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

  public tutorialArticlesCount(tutorialId: number): Observable<{ count: number }> {
    return this.http.get<{ count: number }>(Utils.doApiUrl(`tutorials/${tutorialId}/articles/this-tutorial-count/`));
  }

  public loadTutorialArticle(tutorialId: number, articleId: number): Observable<TutorialArticle> {
    return this.http.get<TutorialArticle>(`tutorials/${tutorialId}/articles/${articleId}`);
  }

  public loadTutorial(tutorialId: number): Observable<Tutorial> {
    return this.http.get<Tutorial>(Utils.doApiUrl(`tutorials/${tutorialId}/`));
  }
}
