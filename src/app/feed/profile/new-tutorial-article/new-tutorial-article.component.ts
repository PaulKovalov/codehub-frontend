import { Component, OnInit } from '@angular/core';
import { TutorialService } from '../tutorial.service';
import { ContentService } from '../../services/content.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NewArticleBaseComponent } from '../new-article-base/new-article-base.component';

@Component({
  selector: 'app-new-tutorial-article',
  templateUrl: './new-tutorial-article.component.html',
  styleUrls: ['./new-tutorial-article.component.scss']
})
export class NewTutorialArticleComponent extends NewArticleBaseComponent implements OnInit {

  private tutorialId: number;
  public tutorialTitle: string;
  public loadingEditorDone = false;
  constructor(private tutorialService: TutorialService,
              private router: Router,
              private contentService: ContentService,
              private activatedRoute: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    this.mode = this.activatedRoute.snapshot.data.mode;
    if (this.mode === 'create') {
      this.activatedRoute.paramMap.subscribe((paramMap) => {
        this.tutorialId = Number(paramMap.get('tutorialId'));
        this.contentService.loadTutorial(this.tutorialId).subscribe((data) => {
          this.tutorialTitle = data.title;
          this.articlesCount = data.total_articles;
        });
      });
    } else if (this.mode === 'edit') {
      this.activatedRoute.paramMap.subscribe((paramMap) => {
        this.editArticleId = Number(paramMap.get('articleId'));
        this.tutorialId = Number(paramMap.get('tutorialId'));
        this.contentService.loadTutorialArticle(this.tutorialId, this.editArticleId).subscribe((article) => {
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
      this.tutorialService.postTutorialArticle(this.tutorialId, article).subscribe(() => {
        this.router.navigateByUrl(`/profile/my-tutorials/${this.tutorialId}`);
      }, (err) => {
        this.errorsText = 'There is an error occurred during processing your article. The article wasn\'t saved, make sure to save it!';
        this.submitButtonEnabled = true;

      });
    } else if (this.mode === 'edit') {
      const updateData = {
        text: this.editor,
        title: this.articleTitle.value
      };
      this.tutorialService.editTutorialArticle(this.tutorialId, this.editArticleId, updateData).subscribe(() => {
        this.router.navigateByUrl(`/profile/my-tutorials/${this.tutorialId}`);
      }, (err) => {
        this.errorsText = 'There is an error occurred during processing your article. The article wasn\'t saved, make sure to save it!';
        this.submitButtonEnabled = true;
      });
    }
  }
}
