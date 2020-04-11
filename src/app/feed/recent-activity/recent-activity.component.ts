import { Component, OnInit } from '@angular/core';
import { ContentService } from '../services/content.service';
import { ArticlePreview } from '../interfaces';

@Component({
  selector: 'app-recent-activity',
  templateUrl: './recent-activity.component.html',
  styleUrls: ['./recent-activity.component.scss']
})
export class RecentActivityComponent implements OnInit {
  public recentArticles: ArticlePreview[];
  public recentTutorials = null;

  constructor(private contentService: ContentService) {
  }

  ngOnInit() {
    this.contentService.loadRecentArticles().subscribe((articles) => {
      this.recentArticles = articles;
    }, (err) => {
    });
  }
}
