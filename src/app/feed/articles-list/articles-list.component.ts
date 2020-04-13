import { Component, OnInit } from '@angular/core';
import { ContentService } from '../services/content.service';
import { BaseListComponent } from '../base-list/base-list.component';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss']
})
export class ArticlesListComponent extends BaseListComponent implements OnInit {

  constructor(private contentService: ContentService) {
    super();
  }

  public next() {
    if (!this.noContentLeft && this.canRequestNext) {
      this.canRequestNext = false;
      this.contentService.loadArticlesList(this.cursor, this.urlPrefix).subscribe((page) => {
        this.content = this.content.concat(page.results);
        if (!page.next) {
          this.noContentLeft = true;
        } else {
          this.cursor = this.getCursorFromUrl(page.next);
        }
        this.canRequestNext = true;
      });
    }
  }

  ngOnInit() {
    super.ngOnInit();
  }
}

