import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../accounts/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public appTitle = 'Code Hub';
  public active = false;

  constructor(public accountService: AccountService) {
  }

  ngOnInit() {
  }

  public outsideClickHandler() {
    if (this.active) {
      this.active = !this.active;
    }
  }
}
