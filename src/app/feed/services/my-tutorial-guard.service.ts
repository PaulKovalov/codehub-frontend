import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { ContentService } from './content.service';

@Injectable({
  providedIn: 'root'
})
export class MyTutorialGuardService {

  constructor(private contentService: ContentService) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    const subject = new Subject<boolean>();
    const tutorialId = Number(route.paramMap.get('tutorialId'));
    this.contentService.myTutorialsIds().subscribe((list) => {
      const found = list.find(id => id === tutorialId);
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
