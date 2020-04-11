import { Component, Input, OnInit } from '@angular/core';
import { ArticlePreview } from '../interfaces';

@Component({
  selector: 'app-article-preview',
  templateUrl: './article-preview.component.html',
  styleUrls: ['./article-preview.component.scss']
})

export class ArticlePreviewComponent implements OnInit {
  @Input() article: ArticlePreview;
  public linkToArticle: string;
  public dateCreated: string;

  constructor() {
  }

  ngOnInit() {
    this.dateCreated = new Date(this.article.date_created).toDateString();
    this.linkToArticle = `/articles/${this.article.id}`;
  }

}
