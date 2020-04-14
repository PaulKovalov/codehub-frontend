import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { CreateTutorialFlowService } from '../create-tutorial-flow.service';
import { Router } from '@angular/router';
import { TutorialService } from '../tutorial.service';
import { CreateTutorial } from '../../interfaces';

@Component({
  selector: 'app-new-tutorial',
  templateUrl: './new-tutorial.component.html',
  styleUrls: ['./new-tutorial.component.scss']
})
export class NewTutorialComponent implements OnInit {

  public tutorialTitle = new FormControl('', Validators.required);
  public tutorialPreview = new FormControl();
  public errorsText = '';
  public submitButtonEnabled = true;

  constructor(private createTutorialFlowService: CreateTutorialFlowService, private router: Router, private tutorialService: TutorialService) {
  }

  ngOnInit() {
  }

  public saveAndAddArticle() {
    if (this.validate()) {
      this.save().subscribe((data) => {
        this.submitButtonEnabled = true;
        this.router.navigateByUrl(`/profile/my-tutorials/${data.id}/new-article`);
      }, (err) => {
        this.submitButtonEnabled = true;
        this.errorsText = 'There is an error occurred during processing your article. The article wasn\'t saved, make sure to save it!';
      });
    }
  }

  public saveAndExit() {
    if (this.validate()) {
      this.save().subscribe(() => {
        this.submitButtonEnabled = true;
        this.router.navigateByUrl('/profile/my-tutorials');
      }, (err) => {
        this.submitButtonEnabled = true;
        this.errorsText = 'There is an error occurred during processing your article. The article wasn\'t saved, make sure to save it!';
      });
    }
  }

  private save() {
    this.submitButtonEnabled = false;
    this.errorsText = '';
    const data = {
      title: this.tutorialTitle.value,
    };
    if (this.tutorialPreview.value) {
      data['preview' as keyof CreateTutorial] = this.tutorialPreview.value;
    }
    return this.tutorialService.postTutorial(data);
  }

  private validate(): boolean {
    if (!this.tutorialTitle.valid) {
      Object.keys(this.tutorialTitle.errors).forEach(keyError => {
        switch (keyError) {
          case 'minlength': {
            this.errorsText = 'The title has to be at least 8 chars length';
            break;
          }
          case 'maxlength': {
            this.errorsText = 'The title can be maximum 128 chars long';
            break;
          }
          case 'required': {
            this.errorsText = 'Title is required';
            break;
          }
          default: {
            this.errorsText = 'Unexpected error occurred';
          }
        }
      });
      return false;
    }
    if (!this.tutorialPreview.valid) {
      Object.keys(this.tutorialPreview.errors).forEach(keyError => {
        switch (keyError) {
          case 'maxlength': {
            this.errorsText = 'The preview can be maximum 1024 chars long';
            break;
          }
          default: {
            this.errorsText = 'Unexpected error occurred';
          }
        }
      });
      return false;
    }
    return true;
  }
}
