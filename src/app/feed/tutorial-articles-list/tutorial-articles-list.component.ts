import { Component, Input, OnInit } from '@angular/core';
import { BaseListComponent } from '../base-list/base-list.component';
import { ContentService } from '../services/content.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tutorial-articles-list',
  templateUrl: './tutorial-articles-list.component.html',
})
export class TutorialArticlesListComponent extends BaseListComponent implements OnInit {
  public tutorialId: number;
  @Input() public viewedByOwner = false;
  constructor(private contentService: ContentService, private activatedRoute: ActivatedRoute) {
    super();
  }

  public next() {
    if (!this.noContentLeft && this.canRequestNext) {
      this.canRequestNext = false;
      this.contentService.loadTutorialArticlesList(this.tutorialId, this.cursor).subscribe((page) => {
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
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.tutorialId = Number(paramMap.get('tutorialId'));
      super.ngOnInit();
    });
  }
}
