import { Component, HostListener, OnInit } from '@angular/core';
import { ContentService } from '../../content.service';
import { ArticlePreview } from '../../interfaces';

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

  constructor(private contentService: ContentService) {
  }

  ngOnInit() {
    this.nextArticles();
  }

  public nextArticles() {
    if (!this.noContentLeft && this.canRequestNext) {
      this.canRequestNext = false;
      this.contentService.loadArticlesList(this.cursor).subscribe((page) => {
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

  @HostListener('scroll', ['$event'])
  onScroll(event: any) {
    if (event.target.offsetHeight + event.target.scrollTop + 10 >= event.target.scrollHeight) {
      console.log('event trigger');
      this.nextArticles();
    }
  }

  private getCursorFromUrl(url: string) {
    return url.substring(url.indexOf('cursor') + 'cursor'.length + 1);
  }
}
