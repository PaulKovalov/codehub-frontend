import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public startYear = '2018';
  public endYear = '';

  constructor() {
  }

  ngOnInit() {
    this.endYear = new Date().getFullYear().toString();
  }

}
