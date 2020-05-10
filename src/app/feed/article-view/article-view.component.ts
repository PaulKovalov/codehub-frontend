import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentService } from '../services/content.service';
import { Article } from '../interfaces';
import { AccountService } from '../../accounts/account.service';

@Component({
  selector: 'app-article-view',
  templateUrl: './article-view.component.html',
  styleUrls: ['./article-view.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class ArticleViewComponent implements OnInit {
  public article: Article;
  public editLink: string;
  public dateCreated: string;
  public dateEdited: string | null = null;
  public mode: string;
  private loggedIn = false;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private contentService: ContentService, private authService: AccountService) {
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
    this.authService.isLoggedIn$().subscribe((loggedIn) => this.loggedIn = loggedIn);
    this.mode = this.activatedRoute.snapshot.data.mode;
    this.activatedRoute.paramMap.subscribe((params) => {
      const articleId = params.get('id');
      this.contentService.loadArticle(articleId).subscribe((article) => {
        this.article = article;
        this.dateCreated = new Date(this.article.date_created).toDateString();
        if (this.article.last_modified) {
          this.dateEdited = new Date(this.article.last_modified).toDateString();
        }
        if (this.mode === 'owner') {
          this.editLink = `/profile/my-articles/${this.article.id}/edit`;
        }
      }, (error) => {
        this.router.navigateByUrl('/404');
      });
    });
  }

  public likeArticle() {
    if (this.loggedIn) {
      this.contentService.likeArticle(this.article.id).subscribe((response) => {
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
      this.contentService.dislikeArticle(this.article.id).subscribe((response) => {
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
