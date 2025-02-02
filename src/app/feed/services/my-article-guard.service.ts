import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { ContentService } from './content.service';

@Injectable({
  providedIn: 'root'
})
export class MyArticleGuardService {

  constructor(private contentService: ContentService) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    const subject = new Subject<boolean>();
    const articleId = Number(route.paramMap.get('id'));
    this.contentService.myArticlesIds().subscribe((list) => {
      const found = list.find(id => id === articleId);
      if (found) {
        subject.next(true);
      } else {
        subject.next(false);
      }
    });
    return subject;
  }

  public canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    return this.canActivate(route, state);
  }
}
