import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ContentService } from '../../services/content.service';
import { NewArticleBaseComponent } from '../new-article-base/new-article-base.component';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.scss']
})
export class NewArticleComponent extends NewArticleBaseComponent implements OnInit {
  public loadingEditorDone = false;
  constructor(private articleService: ArticleService,
              private router: Router,
              private contentService: ContentService,
              private activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    this.mode = this.activatedRoute.snapshot.data.mode;
    if (this.mode === 'create') {
      this.contentService.myArticlesCount().subscribe((count) => {
        this.articlesCount = count.count;
      });
    } else if (this.mode === 'edit') {
      this.activatedRoute.paramMap.subscribe((params) => {
        const articleId = params.get('id');
        this.contentService.loadArticle(articleId).subscribe((article) => {
          this.editArticleId = article.id;
          this.editor = article.text;
          this.articleTitle.patchValue(article.title);
        });
      });
    }
  }

  public submit() {
    if (!this.valid()) {
      return;
    }
    this.errorsText = '';
    const article = {
      title: this.articleTitle.value,
      text: this.editor
    };
    this.submitButtonEnabled = false;
    if (this.mode === 'create') {
      this.articleService.postArticle(article).subscribe(() => {
        this.router.navigateByUrl('/profile/my-articles');
      }, (err) => {
        this.errorsText = 'There is an error occurred during processing your article. The article wasn\'t saved, make sure to save it!';
        this.submitButtonEnabled = true;

      });
    } else if (this.mode === 'edit') {
      const updateData = {
        text: this.editor,
        title: this.articleTitle.value
      };
      this.articleService.editArticle(this.editArticleId, updateData).subscribe(() => {
        this.router.navigateByUrl('/profile/my-articles');
      }, (err) => {
        this.errorsText = 'There is an error occurred during processing your article. The article wasn\'t saved, make sure to save it!';
        this.submitButtonEnabled = true;
      });
    }
  }
}

