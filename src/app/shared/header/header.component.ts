import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../accounts/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public appTitle = 'Code Hub';
  public loggedIn = false;

  constructor(public accountService: AccountService, private router: Router) {
  }

  ngOnInit() {
    this.accountService.isLoggedIn$().subscribe((loggedIn) => {
      this.loggedIn = loggedIn;
    });
  }

  public doLogout() {
    this.accountService.logout().subscribe(() => {
      this.accountService.updateAuthState();
      this.router.navigateByUrl('/');
    });
  }
}
