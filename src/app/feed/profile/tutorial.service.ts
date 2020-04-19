import { Injectable } from '@angular/core';
import { CreateArticle, CreateTutorial, Tutorial, TutorialArticle } from '../interfaces';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Utils } from '../../shared/utils';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {

  constructor(private http: HttpClient) {
  }

  public postTutorial(createTutorial: CreateTutorial): Observable<Tutorial> {
    return this.http.post<Tutorial>(Utils.doApiUrl('tutorials/'), createTutorial);
  }

  public postTutorialArticle(tutorialId: number, article: CreateArticle): Observable<TutorialArticle> {
    return this.http.post<TutorialArticle>(Utils.doApiUrl(`tutorials/${tutorialId}/articles/`), article);
  }

  public editTutorialArticle(tutorialId: number, articleId: number, article: CreateArticle): Observable<TutorialArticle> {
    return this.http.patch<TutorialArticle>(Utils.doApiUrl(`tutorials/${tutorialId}/articles/${articleId}/`), article);
  }

  public editTutorial(tutorialId: number, tutorial: CreateTutorial): Observable<Tutorial> {
    return this.http.patch<Tutorial>(Utils.doApiUrl(`tutorials/${tutorialId}/`), tutorial);
  }
}
