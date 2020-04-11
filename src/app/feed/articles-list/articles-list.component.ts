import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ContentService } from '../services/content.service';
import { ArticlePreview } from '../interfaces';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss']
})
export class ArticlesListComponent implements OnInit {

  public articles: ArticlePreview[] = [];
  private cursor: string | null;
  private noContentLeft = false;
  private canRequestNext = true;
  private urlPrefix = '';
  @Input() public mode = '';

  constructor(private contentService: ContentService) {
  }

  ngOnInit() {
    if (this.mode === 'profile') {
      this.urlPrefix = 'my';
    }
    this.nextArticles();
  }

  public nextArticles() {
    if (!this.noContentLeft && this.canRequestNext) {
      this.canRequestNext = false;
      this.contentService.loadArticlesList(this.cursor, this.urlPrefix).subscribe((page) => {
        this.articles = this.articles.concat(page.results);
        if (!page.next) {
          this.noContentLeft = true;
        } else {
          this.cursor = this.getCursorFromUrl(page.next);
        }
        this.canRequestNext = true;
      });
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    if (document.documentElement.scrollHeight - document.documentElement.scrollTop === document.body.scrollHeight) {
      this.nextArticles();
    }
  }

  private getCursorFromUrl(url: string) {
    return url.substring(url.indexOf('cursor') + 'cursor'.length + 1);
  }
}
