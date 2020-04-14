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
  public mode: string;

  constructor(private contentService: ContentService,
              private activatedRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.mode = this.activatedRoute.snapshot.data.mode;
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      const tutorialId = Number(paramMap.get('tutorialId'));
      this.contentService.loadTutorial(tutorialId).subscribe((data) => {
        this.tutorial = data;
        this.dateCreated = new Date(this.tutorial.date_created).toDateString();
        if (this.mode === 'owner') {
          this.editLink = `/profile/edit-tutorial/${data.id}`;
        }
      });
    });
  }

  public addNewArticle() {
    this.router.navigateByUrl(`/profile/my-tutorials/${this.tutorial.id}/new-article`);
  }
}
