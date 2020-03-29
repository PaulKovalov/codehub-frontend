import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../accounts/account.service';
import { Article } from '../../interfaces/article';
import { Tutorial } from '../../interfaces/tutorial';
import { NavbarElement } from '../../interfaces/navbar-element';

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

  public myArticles: Article[];
  public myTutorials: Tutorial[];
  public selectedNavbarItem: string;
  public navbarItems: NavbarElement[];

  constructor(private accountService: AccountService) {
  }

  ngOnInit() {
    this.navbarItems = nonAuthenticatedNavbarSet;
    this.selectedNavbarItem = this.navbarItems[0].title;
    this.accountService.isLoggedIn$().subscribe((loggedIn) => {
      if (loggedIn) {
        this.navbarItems = authenticatedNavbarSet;
        this.selectedNavbarItem = this.navbarItems[0].title;
      }
    });
  }

  public selectMode(mode: string) {
    this.selectedNavbarItem = mode;
  }
}
