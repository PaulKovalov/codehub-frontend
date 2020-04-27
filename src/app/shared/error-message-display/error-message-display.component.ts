import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../feed/services/content.service';

@Component({
  selector: 'app-error-message-dispaly',
  templateUrl: './error-message-display.component.html',
  styleUrls: ['./error-message-display.component.scss']
})
export class ErrorMessageDisplayComponent implements OnInit {
  public message: string;
  public show = true;
  public displayAnimation = false;

  constructor(private contentService: ContentService) {
  }

  ngOnInit() {
    this.contentService.getErrorMessages().subscribe(msg => this.message = msg);
  }

  public close() {
    this.displayAnimation = true;
    setTimeout(() => {
      this.show = false;
    }, 500);
  }
}
