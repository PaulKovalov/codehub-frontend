import {Component, OnInit} from '@angular/core';
import {ContentService} from '../../home/content.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public appTitle = 'Code Hub';

  constructor(private contentService: ContentService) {
  }

  ngOnInit() {
  }

}
