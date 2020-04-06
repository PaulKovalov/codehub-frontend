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

  constructor(public accountService: AccountService, private router: Router) {
  }

  ngOnInit() {
  }

  public doLogout() {
    this.accountService.logout().subscribe(() => {
      this.accountService.updateAuthState();
      this.router.navigateByUrl('/');
    });
  }
}
