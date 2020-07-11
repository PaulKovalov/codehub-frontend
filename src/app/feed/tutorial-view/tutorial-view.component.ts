import { Component, OnInit } from '@angular/core';
import { Tutorial } from '../interfaces';
import { ContentService } from '../services/content.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tutorial-view',
  templateUrl: './tutorial-view.component.html',
  styleUrls: ['./tutorial-view.component.scss']
})
export class TutorialViewComponent implements OnInit {
  public tutorial: Tutorial;
  public editLink: string;
  public dateCreated: string;
  public dateEdited: string | null = null;
  public mode: string;

  constructor(private contentService: ContentService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  get tutorialViews() {
    const mod = 10 ** (Math.round(Math.log(this.tutorial.views) / Math.log(10)) - 2);
    if (this.tutorial.views >= 1e6) {
      return `${(this.tutorial.views - (this.tutorial.views % mod)) / 1e6}M`;
    }
    if (this.tutorial.views >= 1e3) {
      return `${(this.tutorial.views - (this.tutorial.views % mod)) / 1e3}K`;
    }
    return this.tutorial.views;
  }

  public addNewArticle() {
    this.router.navigateByUrl(`/profile/my-tutorials/${this.tutorial.id}/new-article`);
  }

  ngOnInit() {
    this.mode = this.activatedRoute.snapshot.data.mode;
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      const tutorialId = Number(paramMap.get('tutorialId'));
      if (isNaN(tutorialId)) {
        this.router.navigateByUrl('/404');
      }
      this.contentService.loadTutorial(tutorialId).subscribe((data) => {
        this.tutorial = data;
        this.dateCreated = new Date(this.tutorial.date_created).toDateString();
        if (this.tutorial.last_modified) {
          this.dateEdited = new Date(this.tutorial.last_modified).toDateString();
        }
        if (this.mode === 'owner') {
          this.editLink = `/profile/my-tutorials/${data.id}/edit`;
        }
      });
    });
  }
}
