import { Component, OnInit } from '@angular/core';
import { ContentService } from '../services/content.service';
import { ActivatedRoute } from '@angular/router';
import { Comment } from '../interfaces';

export interface CommentNode {
  depth: number;
  comment: Comment;
}


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  public comments: Comment[] = [];
  public commentInput: string;
  public addCommentShown = false;
  public posting = false;
  public errorsText: string;
  public commentsTree: CommentNode[] = [];
  private cursor: string = null;
  private articleId: number;
  private commentsHashTable = {};

  constructor(private contentService: ContentService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((data) => {
      this.articleId = Number(data.get('id'));
      this.contentService.loadArticleComments(this.articleId, this.cursor).subscribe((page) => {
        this.comments = this.comments.concat(page.results);
        this.cursor = page.next;
        this.commentsHashTable = {};
        for (const comment of this.comments) {
          this.commentsHashTable[comment.id] = comment;
        }
        this.parseComments();
      });
    });
  }

  public cancel() {
    this.commentInput = '';
    this.addCommentShown = false;
  }

  public disabled() {
    if (this.posting) {
      return true;
    }
    if (this.commentInput) {
      return !this.commentInput.trim().length;
    }
    return true;
  }

  public postComment() {
    const data = {
      text: this.commentInput
    };
    this.posting = true;
    this.contentService.postArticleComment(this.articleId, data).subscribe((comment) => {
      this.posting = false;
    }, (error) => {
      this.posting = false;
      this.errorsText = 'An unexpected error occurred';
    });
  }

  public dateOf(comment: Comment) {
    const now = new Date();
    const cDate = new Date(comment.date_created);
    if (now.getFullYear() === cDate.getFullYear()) {
      if (now.getMonth() === cDate.getMonth()) {
        if (now.getDate() === cDate.getDate()) {
          if (now.getHours() === cDate.getHours()) {
            if (now.getMinutes() === cDate.getMinutes()) {
              return 'a few seconds ago';
            } else {
              return `${now.getMinutes() - cDate.getMinutes()} minutes ago`;
            }
          } else {
            const hours = now.getHours() - cDate.getHours();
            return `${hours} ${hours > 1 ? 'hours':'hour'} ago`;
          }
        } else {
          const days = now.getDate() - cDate.getDate();
          return `${days} ${days > 1 ? 'days':'day'} ago`;
        }
      } else {
        const months = now.getMonth() - cDate.getMonth();
        return `${months} ${months > 1 ? 'months':'month'} ago`;
      }
    } else {
      const years = now.getFullYear() - cDate.getFullYear();
      return `${years} ${years > 1 ? 'years':'year'} ago`;
    }
  }

  private buildTree(root: Comment, initialDepth = 0) {
    console.log('build tree called');
    this.commentsTree.push({depth: initialDepth, comment: root});
    for (const reply of root.replies) {
      // get comment from the hash table, and build a tree from it
      const comment = this.commentsHashTable[reply];
      this.buildTree(comment, initialDepth + 1);
    }
  }

  private parseComments() {
    for (const comment of this.comments) {
      // if a comment is root - it's a tree, build a tree from this root
      if (!comment.reply_to) {
        this.buildTree(comment);
      }
    }
  }
}
