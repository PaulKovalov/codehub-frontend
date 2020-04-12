import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentService } from '../services/content.service';
import { Article } from '../interfaces';
import { AccountService } from '../../accounts/account.service';

@Component({
  selector: 'app-article-view',
  templateUrl: './article-view.component.html',
  styleUrls: ['./article-view.component.scss']
})
export class ArticleViewComponent implements OnInit {
  public article: Article;
  public viewedByOwner = false;
  public editLink: string;
  public dateCreated: string;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private contentService: ContentService,
              private authService: AccountService) {
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
    this.activatedRoute.paramMap.subscribe((params) => {
      const articleId = params.get('id');
      this.contentService.loadArticle(articleId).subscribe((article) => {
        this.article = article;
        this.dateCreated = new Date(this.article.date_created).toDateString();
        this.authService.getCurrentUser$().subscribe((user) => {
          if (user.id === this.article.author) {
            this.viewedByOwner = true;
            this.editLink = `/profile/edit-article/${articleId}`;
          }
        });
      }, (error) => {
        this.router.navigateByUrl('404');
      });
    });
  }
}
