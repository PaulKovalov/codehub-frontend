import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comment, CommentsPage } from '../interfaces';
import { CommentsService } from '../services/comments.service';
import { AccountService } from '../../accounts/account.service';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export interface CommentNode {
  depth: number;
  comment: Comment;
  reply_field_display: boolean;
  edited: boolean;
}


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  @Input() public mode: string;
  public comments: Comment[] = [];
  public commentInput: string;
  public addCommentShown = false;
  public posting = false;
  public errorsText: string;
  public commentsTree: CommentNode[] = [];
  public replyErrorsText: string;
  public replyCommentInput: string;
  public cursor: string = null;
  public loggedIn = true;
  public inputPlaceholder = 'Type comment here';
  private commentsHashTable = {};
  private replyNodeActive: CommentNode = null;
  private editNodeActive: CommentNode = null;
  private articleId: number;
  private tutorialId: number;

  constructor(private commentService: CommentsService,
              private activatedRoute: ActivatedRoute,
              private authService: AccountService) {
  }

  ngOnInit() {
    if (this.mode === 'tutorial') {
      this.activatedRoute.paramMap.subscribe((data) => {
        this.articleId = Number(data.get('articleId'));
        this.tutorialId = Number(data.get('tutorialId'));
        this.loadComments();
      });
    } else {
      this.activatedRoute.paramMap.subscribe((data) => {
        this.articleId = Number(data.get('id'));
        this.loadComments();
      });
    }
    this.authService.isLoggedIn$().subscribe((loggedIn) => {
      this.loggedIn = loggedIn;
      if (!this.loggedIn) {
        this.inputPlaceholder = 'Log in to leave a comment';
      }
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
    if (this.mode === 'tutorial') {
      this.commentService.postTutorialArticleComment(this.tutorialId, this.articleId, data).subscribe((comment: Comment) => {
        this.insertComment(comment);
        this.commentInput = '';
        this.posting = false;
      }, (err) => {
        this.posting = false;
        this.errorsText = 'An unexpected error occurred';
      });
    } else {
      this.commentService.postArticleComment(this.articleId, data).subscribe((comment) => {
        this.insertComment(comment);
        this.commentInput = '';
        this.posting = false;
      }, (error) => {
        this.posting = false;
        this.errorsText = 'An unexpected error occurred';
      });
    }

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
              const minutes = now.getMinutes() - cDate.getMinutes();
              return `${minutes} ${minutes > 1 ? 'minutes' : 'minute'} ago`;
            }
          } else {
            const hours = now.getHours() - cDate.getHours();
            return `${hours} ${hours > 1 ? 'hours' : 'hour'} ago`;
          }
        } else {
          const days = now.getDate() - cDate.getDate();
          return `${days} ${days > 1 ? 'days' : 'day'} ago`;
        }
      } else {
        const months = now.getMonth() - cDate.getMonth();
        return `${months} ${months > 1 ? 'months' : 'month'} ago`;
      }
    } else {
      const years = now.getFullYear() - cDate.getFullYear();
      return `${years} ${years > 1 ? 'years' : 'year'} ago`;
    }
  }

  public replyClick(node: CommentNode) {
    if (this.loggedIn) {
      this.replyCommentInput = '';
      if (this.replyNodeActive) {
        this.replyNodeActive.reply_field_display = false;
      }
      this.replyNodeActive = node;
      this.replyNodeActive.reply_field_display = true;
    } else {
      alert('Log in to leave a comment');
    }
  }

  public cancelReplyClick() {
    this.replyNodeActive.reply_field_display = false;
  }

  public inputClick() {
    if (this.loggedIn) {
      this.addCommentShown = true;
    }
  }

  public loadComments() {
    if (this.mode === 'tutorial') {
      this.commentService.loadTutorialArticleComments(this.tutorialId, this.articleId, this.cursor).subscribe((page: CommentsPage) => {
        this.preprocessRawCommentsData(page);
      });
    } else {
      this.commentService.loadArticleComments(this.articleId, this.cursor).subscribe((page) => {
        this.preprocessRawCommentsData(page);
      });
    }
  }

  public replyDisabled() {
    if (this.posting) {
      return true;
    }
    if (this.replyCommentInput) {
      return !this.replyCommentInput.trim().length;
    }
    return true;
  }

  public postReply(toComment: Comment) {
    const data = {
      text: this.replyCommentInput,
      reply_to: toComment.id
    };
    this.posting = true;
    if (this.mode === 'tutorial') {
      this.commentService.postTutorialArticleComment(this.tutorialId, this.articleId, data).subscribe((comment) => {
        this.processReplyPostResponse(comment);
      }, (err) => {
        this.replyErrorsText = 'An unexpected error occured';
      });
    } else {
      this.commentService.postArticleComment(this.articleId, data).subscribe((comment) => {
        this.processReplyPostResponse(comment);
      }, (err) => {
        this.replyErrorsText = 'An unexpected error occurred';
      });
    }
  }

  public showEditPrompt(node: CommentNode) {
    if (this.loggedIn) {
      if (this.editNodeActive) {
        this.editNodeActive.edited = false;
      }
      this.editNodeActive = node;
      this.replyNodeActive.edited = true;
    } else {
      alert('Log in to leave a comment');
    }
  }

  public likeComment(comment: Comment) {
    if (this.loggedIn) {
      if (this.mode === 'tutorial') {
        this.commentService.likeTutorialArticleComment(this.tutorialId, this.articleId, comment.id).subscribe((response) => {
          this.processLikeResponse(comment, response);
        });
      } else {
        this.commentService.likeArticleComment(this.articleId, comment.id).subscribe((response) => {
          this.processLikeResponse(comment, response);
        }, (error => {
        }));
      }
    } else {
      alert('Log in to put "like"');
    }
  }

  public dislikeComment(comment: Comment) {
    if (this.loggedIn) {
      if (this.mode === 'tutorial') {
        this.commentService.dislikeTutorialArticleComment(this.tutorialId, this.articleId, comment.id).subscribe((response) => {
          this.processDislikeResponse(comment, response);
        });
      } else {
        this.commentService.dislikeArticleComment(this.articleId, comment.id).subscribe((response) => {
          this.processDislikeResponse(comment, response);
        }, (error => {
        }));
      }
    } else {
      alert('Log in to put "dislike"');
    }
  }

  private processLikeResponse(comment: Comment, response: string) {
    if (response === 'inc') {
      comment.likes += 1;
    } else if (response === 'swap') {
      comment.likes += 1;
      comment.dislikes -= 1;
    } else if (response === 'dec') {
      comment.likes -= 1;
    }
  }

  private processDislikeResponse(comment: Comment, response: string) {
    if (response === 'inc') {
      comment.dislikes += 1;
    } else if (response === 'swap') {
      comment.dislikes += 1;
      comment.likes -= 1;
    } else if (response === 'dec') {
      comment.dislikes -= 1;
    }
  }

  private preprocessRawCommentsData(page: CommentsPage) {
    this.comments = this.comments.concat(page.results);
    if (page.next) {
      this.cursor = this.getCursorFromUrl(page.next);
    } else {
      this.cursor = null;
    }
    this.commentsHashTable = {};
    for (const comment of this.comments) {
      this.commentsHashTable[comment.id] = comment;
    }
    this.parseComments();
  }

  private parseComments() {
    this.commentsTree = [];
    for (const comment of this.comments) {
      // if a comment is root - it's a tree, build a tree from this root
      if (!comment.reply_to) {
        this.buildTree(comment);
      }
    }
  }

  private getCursorFromUrl(url: string) {
    return url.substring(url.indexOf('cursor') + 'cursor'.length + 1);
  }

  public editComment() {

  }

  public isAuthor(node: CommentNode): Observable<boolean> {
    if (this.loggedIn) {
      return this.authService.getCurrentUser$().pipe(map(user => {
        return user.id === node.comment.author;
      }));
    } else {
      return of(false);
    }
  }

  private processReplyPostResponse(comment: Comment) {
    this.comments.push(comment);
    this.insertComment(comment);
    this.replyCommentInput = '';
    this.replyNodeActive.reply_field_display = false;
    this.posting = false;
  }

  private buildTree(root: Comment, initialDepth = 0) {
    this.commentsTree.push(this.buildCommentNode(root, initialDepth));
    for (const reply of root.replies) {
      // get comment from the hash table, and build a tree from it
      const comment = this.commentsHashTable[reply];
      this.buildTree(comment, initialDepth + 1);
    }
  }

  private buildCommentNode(commentObj: Comment, depthVal: number): CommentNode {
    return {
      comment: commentObj,
      depth: depthVal,
      reply_field_display: false,
      edited: false
    };
  }

  private insertComment(commentToAdd: Comment) {
    // inserts comment in the comment tree
    if (commentToAdd.reply_to) {
      const parentIndex = this.commentsTree.findIndex(c => c.comment.id === commentToAdd.reply_to);
      this.commentsTree.splice(parentIndex + 1, 0, this.buildCommentNode(commentToAdd, this.commentsTree[parentIndex].depth + 1));
    } else {
      this.commentsTree.unshift(this.buildCommentNode(commentToAdd, 0));
    }
  }
}
