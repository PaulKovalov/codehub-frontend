import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentService } from '../services/content.service';
import { TutorialArticle } from '../interfaces';

@Component({
  selector: 'app-tutorial-article-view',
  templateUrl: './tutorial-article-view.component.html',
  styleUrls: ['./tutorial-article-view.component.scss']
})
export class TutorialArticleViewComponent implements OnInit {

  public mode: string;
  public tutorialId: number;
  public articleId: number;
  public article: TutorialArticle;
  public editLink: string;
  public dateCreated: string;

  constructor(private router: Router, private contentService: ContentService, private activatedRoute: ActivatedRoute) {
  }

  get articleViews() {
    const mod = 10 ** (Math.round(Math.log(this.article.views) / Math.log(10)) - 2);
    if (this.article.views >= 1e6) {
      return `${(this.article.views - (this.article.views % mod)) / 1e6}M`;
    }
    if (this.article.views >= 1e3) {
      return `${(this.article.views - (this.article.views % mod)) / 1e3}K`;
    }
    return this.article.views;
  }

  ngOnInit() {
    this.mode = this.activatedRoute.snapshot.data.mode;
    if (this.mode === 'owner') {
      this.editLink = 'edit';
    }
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.tutorialId = Number(paramMap.get('tutorialId'));
      this.articleId = Number(paramMap.get('articleId'));
      this.contentService.loadTutorialArticle(this.tutorialId, this.articleId).subscribe((data) => {
        this.article = data;
        this.dateCreated = new Date(this.article.date_created).toDateString();
      }, (err) => {
        this.router.navigateByUrl('/404');
      });
    });
  }

  public nextArticle() {
    if (this.article.nav.next !== -1) {
      if (this.mode === 'owner') {
        return `/profile/my-tutorials/${this.tutorialId}/articles/${this.article.nav.next}`;
      } else {
        return `/tutorials/${this.tutorialId}/articles/${this.article.nav.next}`;
      }
    }
  }

  public prevArticle() {
    if (this.article.nav.prev !== -1) {
      if (this.mode === 'owner') {
        return `/profile/my-tutorials/${this.tutorialId}/articles/${this.article.nav.prev}`;
      } else {
        return `/tutorials/${this.tutorialId}/articles/${this.article.nav.prev}`;
      }
    }
  }
}
