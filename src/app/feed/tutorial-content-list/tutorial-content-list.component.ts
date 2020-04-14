import { Component, Input, OnInit } from '@angular/core';
import { ContentService } from '../services/content.service';
import { TableOfContentItem } from '../interfaces';

@Component({
  selector: 'app-tutorial-content-list',
  templateUrl: './tutorial-content-list.component.html',
  styleUrls: ['./tutorial-content-list.component.scss']
})
export class TutorialContentListComponent implements OnInit {
  @Input() public tutorialId: number;
  @Input() mode: string;
  public tableOfContent: TableOfContentItem[];

  constructor(private contentService: ContentService) {
  }

  ngOnInit() {
    this.contentService.loadTutorialsTableOfContent(this.tutorialId).subscribe((data) => {
      this.tableOfContent = data;
    });
  }

  public getLinkToArticle(articleId: number) {
    if (this.mode === 'owner') {
      return `/profile/my-tutorials/${this.tutorialId}/articles/${articleId}`;
    } else {
      return `/tutorials/${this.tutorialId}/articles/${articleId}`;
    }
  }
}
