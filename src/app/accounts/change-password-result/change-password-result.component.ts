import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-change-password-result',
  templateUrl: './change-password-result.component.html',
  styleUrls: ['../account-styles.scss']
})
export class ChangePasswordResultComponent implements OnInit {
  public mode: string;

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.mode = this.activatedRoute.snapshot.data.mode;
  }

}
