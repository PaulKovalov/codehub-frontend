import {Component, OnInit} from '@angular/core';
import {AccountService} from '../../accounts/account.service';
import {ContentService} from '../../home/content.service';
import {Article} from '../../interfaces/article';
import {Tutorial} from '../../interfaces/tutorial';
import {NavbarElement} from '../../interfaces/navbar-element';

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

  constructor(private accountService: AccountService, private contentService: ContentService) {
  }

  ngOnInit() {
    this.contentService.getNavbarItems().subscribe((data) => {
      this.navbarItems = data;
      this.selectedNavbarItem = this.navbarItems[0].title;
    });
  }

  public selectMode(mode: string) {
    this.selectedNavbarItem = mode;
  }
}
