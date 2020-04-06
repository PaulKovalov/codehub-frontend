import { Component, Input, OnInit } from '@angular/core';
import { ArticlePreview } from '../interfaces';

@Component({
  selector: 'app-article-preview',
  templateUrl: './article-preview.component.html',
  styleUrls: ['./article-preview.component.scss']
})

export class ArticlePreviewComponent implements OnInit {
  @Input() article: ArticlePreview;

  constructor() {
  }

  ngOnInit() {
  }

}
