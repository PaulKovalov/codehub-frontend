import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.scss']
})
export class NewArticleComponent implements OnInit {

  public editor: any;
  public articleTitle = new FormControl('', Validators.required);
  public submitButtonEnabled = true;
  public errorsText = '';

  constructor(private articleService: ArticleService, private router: Router) {
  }

  ngOnInit() {
  }

  public submit() {
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
      return;
    }
    if (this.editor) {
      if (this.editor.length < 64) {
        this.errorsText = 'The article is too short';
        return;
      }
      if (this.editor.length > 32768) {
        this.errorsText = 'The article is too big';
        return;
      }
      this.errorsText = '';
      const article = {
        title: this.articleTitle.value,
        text: this.editor
      };
      this.submitButtonEnabled = false;
      this.articleService.postArticle(article).subscribe(() => {
        this.router.navigateByUrl('/profile/my-articles');
      }, (err) => {
        this.errorsText = 'There is an error occurred during processing your article. The article wasn\'t saved, make sure to save it!';
        this.submitButtonEnabled = true;

      });
    } else {
      this.errorsText = 'The article is empty';
    }
  }
}
