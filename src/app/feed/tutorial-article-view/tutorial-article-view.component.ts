import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentService } from '../services/content.service';
import { TutorialArticle } from '../interfaces';
import { AccountService } from '../../accounts/account.service';
import { HighlightService } from '../services/highlight.service';

@Component({
  selector: 'app-tutorial-article-view',
  templateUrl: './tutorial-article-view.component.html',
  styleUrls: ['./tutorial-article-view.component.scss'],
})
export class TutorialArticleViewComponent implements OnInit, AfterViewChecked {

  public mode: string;
  public tutorialId: number;
  public articleId: number;
  public article: TutorialArticle;
  public editLink: string;
  public dateCreated: string;
  public dateEdited: string | null = null;
  private loggedIn = false;
  private highlighted = false;

  constructor(private router: Router,
              private contentService: ContentService,
              private activatedRoute: ActivatedRoute,
              private authService: AccountService,
              private highlightService: HighlightService) {
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

  ngAfterViewChecked() {
    if (this.article && !this.highlighted) {
      this.highlightService.highlightAll();
      this.highlighted = true;
    }
  }

  ngOnInit() {
    this.authService.isLoggedIn$().subscribe((isLoggedIn) => {
      this.loggedIn = isLoggedIn;
    });
    this.mode = this.activatedRoute.snapshot.data.mode;
    if (this.mode === 'owner') {
      this.editLink = 'edit';
    }
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.tutorialId = Number(paramMap.get('tutorialId'));
      this.articleId = Number(paramMap.get('articleId'));
      if (isNaN(this.tutorialId) || isNaN(this.articleId)) {
        this.router.navigateByUrl('/404');
      }
      this.contentService.loadTutorialArticle(this.tutorialId, this.articleId).subscribe((data) => {
        this.article = data;
        this.dateCreated = new Date(this.article.date_created).toDateString();
        if (this.article.last_modified) {
          this.dateEdited = new Date(this.article.last_modified).toDateString();
        }
      }, (err) => {
        this.router.navigateByUrl('/404');
      });
    });
  }

  public nextArticle() {
    if (this.article.nav.next !== -1) {
      window.scroll(0, 0);
      if (this.mode === 'owner') {
        this.router.navigateByUrl(`/profile/my-tutorials/${this.tutorialId}/articles/${this.article.nav.next}`);
      } else {
        this.router.navigateByUrl(`/tutorials/${this.tutorialId}/articles/${this.article.nav.next}`);
      }
    }
  }

  public prevArticle() {
    if (this.article.nav.prev !== -1) {
      window.scroll(0, 0);
      if (this.mode === 'owner') {
        this.router.navigateByUrl(`/profile/my-tutorials/${this.tutorialId}/articles/${this.article.nav.prev}`);
      } else {
        this.router.navigateByUrl(`/tutorials/${this.tutorialId}/articles/${this.article.nav.prev}`);
      }
    }
  }

  public backToTutorial() {
    if (this.mode === 'owner') {
      return `/profile/my-tutorials/${this.tutorialId}`;
    } else {
      return `/tutorials/${this.tutorialId}`;
    }
  }

  public likeArticle() {
    if (this.loggedIn) {
      this.contentService.likeTutorialArticle(this.tutorialId, this.article.id).subscribe((response) => {
        if (response === 'inc') {
          this.article.likes += 1;
        } else if (response === 'swap') {
          this.article.likes += 1;
          this.article.dislikes -= 1;
        } else if (response === 'dec') {
          this.article.likes -= 1;
        }
      }, (error) => {
        if (!this.article.published) {
          alert('Reactions will be available when article is published');
        }
      });
    } else {
      alert('Log in to put "like"');
    }
  }

  public dislikeArticle() {
    if (this.loggedIn) {
      this.contentService.dislikeTutorialArticle(this.tutorialId, this.article.id).subscribe((response) => {
        if (response === 'inc') {
          this.article.dislikes += 1;
        } else if (response === 'swap') {
          this.article.dislikes += 1;
          this.article.likes -= 1;
        } else if (response === 'dec') {
          this.article.dislikes -= 1;
        }
      }, (error) => {
        if (!this.article.published) {
          alert('Reactions will be available when article is published');
        }
      });
    } else {
      alert('Log in to put "dislike"');
    }
  }
}
