import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../accounts/account.service';
import { NavbarElement } from '../interfaces';
import { ArticlePreview } from '../../home/interfaces';

const nonAuthenticatedNavbarSet: NavbarElement[] = [
  {
    title: 'articles',
    asset: null
  },
  {
    title: 'tutorials',
    asset: null
  },
  {
    title: 'search',
    asset: 'assets/img/search.png'
  }
];

const authenticatedNavbarSet: NavbarElement[] = [...nonAuthenticatedNavbarSet, ...[
  {
    title: 'my articles',
    asset: null
  },
  {
    title: 'my tutorials',
    asset: null
  },
]
];

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public myArticles: ArticlePreview[];
  public selectedNavbarItem: string;
  public navbarItems: NavbarElement[];

  public mobileOpened = false;

  constructor(private accountService: AccountService) {
  }

  ngOnInit() {
    this.accountService.isLoggedIn$().subscribe((loggedIn) => {
      if (loggedIn) {
        this.navbarItems = authenticatedNavbarSet;
        this.selectedNavbarItem = this.navbarItems[0].title;
      } else {
        this.navbarItems = nonAuthenticatedNavbarSet;
        this.selectedNavbarItem = this.navbarItems[0].title;
      }
    });
  }

  public selectMode(mode: string) {
    this.selectedNavbarItem = mode;
  }

  public outsideClickHandler() {
    if (this.mobileOpened) {
      this.mobileOpened = !this.mobileOpened;
    }
  }
}
