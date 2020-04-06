import { Component } from '@angular/core';
import { NavbarElement } from '../interfaces';
import { Router } from '@angular/router';
import { NavbarService } from '../services/navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {

  public selectedNavbarItem: string;
  public navbarItems: NavbarElement[];

  public mobileOpened = false;

  constructor(private navbarService: NavbarService, private router: Router) {
    this.navbarService.navbarItems$().subscribe((items) => {
      this.navbarItems = items;
    });
  }

  public selectMode(element: NavbarElement) {
    this.selectedNavbarItem = element.title;
    this.router.navigateByUrl(element.routerLink);
  }

  public outsideClickHandler() {
    if (this.mobileOpened) {
      this.mobileOpened = !this.mobileOpened;
    }
  }
}
