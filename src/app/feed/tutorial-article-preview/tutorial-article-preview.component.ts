import { Component, Input, OnInit } from '@angular/core';
import { TutorialArticlePreview } from '../interfaces';

@Component({
  selector: 'app-tutorial-article-preview',
  templateUrl: '../article-preview/article-preview.component.html',
  styleUrls: ['../article-preview/article-preview.component.scss']
})
export class TutorialArticlePreviewComponent implements OnInit {

  @Input() article: TutorialArticlePreview;
  @Input() tutorialId: number;
  @Input() public mode: string;
  public linkToArticle: string;
  public dateCreated: string;

  constructor() {
  }

  ngOnInit() {
    this.dateCreated = new Date(this.article.date_created).toDateString();
    this.linkToArticle = `/tutorials/${this.tutorialId}/articles/${this.article.id}`;
  }
}
