import { Component, OnInit } from '@angular/core';
import { Tutorial } from '../interfaces';
import { ContentService } from '../services/content.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../../accounts/account.service';

@Component({
  selector: 'app-tutorial-view',
  templateUrl: './tutorial-view.component.html',
  styleUrls: ['./tutorial-view.component.scss']
})
export class TutorialViewComponent implements OnInit {
  public tutorial: Tutorial;
  public viewedByOwner = false;
  public editLink: string;
  public dateCreated: string;

  constructor(private contentService: ContentService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private authService: AccountService) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      const tutorialId = Number(paramMap.get('id'));
      this.contentService.loadTutorial(tutorialId).subscribe((data) => {
        this.tutorial = data;
        this.dateCreated = new Date(this.tutorial.date_created).toDateString();
        this.authService.getCurrentUser$().subscribe((user) => {
          if (user.id === this.tutorial.author) {
            this.viewedByOwner = true;
            this.editLink = `/profile/edit-tutorial/${tutorialId}`;
          }
        });
      });
    });
  }
}
