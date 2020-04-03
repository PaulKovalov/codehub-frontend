import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentService } from '../../content.service';
import { Article } from '../../interfaces';

@Component({
  selector: 'app-article-view',
  templateUrl: './article-view.component.html',
  styleUrls: ['./article-view.component.scss']
})
export class ArticleViewComponent implements OnInit {
  public article: Article;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private contentService: ContentService) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      const articleId = params.get('id');
      this.contentService.loadArticle(articleId).subscribe((article) => {
        this.article = article;
      }, (error) => {
        this.router.navigateByUrl('not-found');
      });
    });
  }
}
