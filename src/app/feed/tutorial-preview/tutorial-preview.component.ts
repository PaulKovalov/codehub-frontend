import { Component, Input, OnInit } from '@angular/core';
import { Tutorial } from '../interfaces';

@Component({
  selector: 'app-tutorial-preview',
  templateUrl: './tutorial-preview.component.html',
  styleUrls: ['./tutorial-preview.component.scss']
})
export class TutorialPreviewComponent implements OnInit {
  @Input() public tutorial: Tutorial;
  @Input() public mode: string;
  public linkToTutorial: string;
  public dateCreated: string;

  constructor() {
  }

  ngOnInit() {
    this.dateCreated = new Date(this.tutorial.date_created).toDateString();
    if (this.mode === 'owner') {
      this.linkToTutorial = `/profile/my-tutorials/${this.tutorial.id}`;
    } else {
      this.linkToTutorial = `/tutorials/${this.tutorial.id}`;
    }
  }
}
