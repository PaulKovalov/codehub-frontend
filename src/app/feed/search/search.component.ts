import { Component, OnInit } from '@angular/core';
import { SearchService } from '../services/search.service';
import { ArticlePreview, BasePreview, SearchResult, Tutorial, TutorialArticlePreview } from '../interfaces';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public searchQuery: string;
  public articlesResult: ArticlePreview[] = [];
  public tutorialArticlesResult: TutorialArticlePreview[] = [];
  public tutorialsResult: Tutorial[] = [];
  public searchTime = 0;
  public searchPerformed = false;
  public lastExecutedQuery: string;

  constructor(private searchService: SearchService) {
  }

  ngOnInit() {
    const lastResult = this.searchService.lastResult;
    if (lastResult) {
      this.preprocessSearchResult(lastResult.result);
      this.searchPerformed = true;
      this.lastExecutedQuery = lastResult.query;
    }
  }

  public performSearch() {
    if (this.hasQuery()) {
      this.searchQuery = this.searchQuery.trim();
      this.lastExecutedQuery = this.searchQuery;
      this.searchService.search(this.searchQuery).subscribe((data) => {
        this.preprocessSearchResult(data);
      }, error => {
      });
    }
  }

  public hasQuery() {
    return this.searchQuery && this.searchQuery.trim().length > 0;
  }

  public hasItems(content: BasePreview[]): boolean {
    return content.length > 0;
  }

  public anyResult() {
    return this.articlesResult.length > 0 || this.tutorialsResult.length > 0 || this.tutorialArticlesResult.length > 0;
  }

  public requestTime(): number {
    return this.searchTime / 1000;
  }

  private preprocessSearchResult(result: SearchResult) {
    this.searchTime = result.time;
    this.articlesResult = result.results.articles;
    this.tutorialsResult = result.results.tutorials;
    this.tutorialArticlesResult = result.results.tutorial_articles;
    this.searchPerformed = true;
  }
}
