import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-article-base',
  templateUrl: './new-article-base.component.html',
  styleUrls: ['./new-article-base.component.scss']
})
export class NewArticleBaseComponent implements OnInit {
  public editor: any;
  public articleTitle = new FormControl('', Validators.required);
  public submitButtonEnabled = true;
  public errorsText = '';
  public articlesCount = 0;
  public editArticleId: number;
  public mode: string;

  constructor() {
  }

  ngOnInit() {
  }

  public valid(): boolean {
    if (!this.articleTitle.valid) {
      Object.keys(this.articleTitle.errors).forEach(keyError => {
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
    if (this.editor) {
      if (this.editor.length < 64) {
        this.errorsText = 'The article is too short';
        return false;
      }
      if (this.editor.length > 32768) {
        this.errorsText = 'The article is too big';
        return false;
      }
    } else {
      this.errorsText = 'The article is empty';
    }
    return true;
  }
}
