import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../accounts/auth.service';
import {ApiService} from '../../home/api.service';
import {Article} from '../../interfaces/article';
import {Tutorial} from '../../interfaces/tutorial';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isAuthorized: boolean;
  myArticles: Article[];
  myTutorials: Tutorial[];

  constructor(private authService: AuthService, private apiService: ApiService) {
    this.isAuthorized = authService.isAuthorized();
  }

  ngOnInit() {

  }

}
