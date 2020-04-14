import { Component, HostListener, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BasePreview } from '../interfaces';

@Component({
  selector: 'app-base-list',
  templateUrl: './base-list.component.html',
  styleUrls: ['./base-list.component.scss']
})
export class BaseListComponent implements OnInit {
  public orderingControl = new FormControl('date');
  @Input() public mode = '';
  public content: BasePreview[] = [];
  protected cursor: string | null;
  protected noContentLeft = false;
  protected canRequestNext = true;
  protected urlPrefix = '';

  constructor() {
  }

  public ngOnInit(): void {
    if (this.mode === 'owner') {
      this.urlPrefix = 'my';
    }
    this.next();
  }

  public next() {
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    if (document.documentElement.scrollHeight - document.documentElement.scrollTop === document.body.scrollHeight) {
      this.next();
    }
  }

  public setOrder() {
    const value = this.orderingControl.value;
    this.content.sort((a, b) => {
      if (value === 'date') {
        const firstArticleDate = new Date(a.date_created);
        const secondArticleDate = new Date(b.date_created);
        if (firstArticleDate < secondArticleDate) {
          return 1;
        }
        if (firstArticleDate > secondArticleDate) {
          return -1;
        }
        return 0;
      } else {
        return b.views - a.views;
      }
    });
  }

  protected getCursorFromUrl(url: string) {
    return url.substring(url.indexOf('cursor') + 'cursor'.length + 1);
  }
}
