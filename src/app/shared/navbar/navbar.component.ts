import {Component, OnInit} from '@angular/core';
import {UserService} from '../../accounts/user.service';
import {ApiService} from '../../home/api.service';
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

  constructor(private userService: UserService, private apiService: ApiService) {
  }

  ngOnInit() {
    this.navbarItems = this.userService.getNavbarItems();
    this.selectedNavbarItem = this.navbarItems[0].title;
  }

  public selectMode(mode: string) {
    this.selectedNavbarItem = mode;
  }
}
