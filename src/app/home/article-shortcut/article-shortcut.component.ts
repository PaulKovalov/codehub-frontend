import {Component, Input, OnInit} from '@angular/core';
import {Article} from '../../interfaces/article';

@Component({
  selector: 'app-article-shortcut',
  templateUrl: './article-shortcut.component.html',
  styleUrls: ['./article-shortcut.component.scss']
})

export class ArticleShortcutComponent implements OnInit {
  @Input() article: Article;

  constructor() {
  }

  ngOnInit() {
  }

}
