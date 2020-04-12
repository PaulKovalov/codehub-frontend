import { Injectable } from '@angular/core';
import { CreateTutorial, Tutorial } from '../interfaces';
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

  public postTutorialArticle(tutorialId: number) {
    Utils.doApiUrl(`tutorials/${tutorialId}/`);
  }
}
