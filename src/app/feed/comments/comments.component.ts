import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comment } from '../interfaces';
import { CommentsService } from '../services/comments.service';

export interface CommentNode {
  depth: number;
  comment: Comment;
  reply_field_display: boolean;
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
  public replyErrorsText: string;
  public replyCommentInput: string;
  private cursor: string = null;
  private articleId: number;
  private commentsHashTable = {};
  private replyNodeActive: CommentNode = null;

  constructor(private commentService: CommentsService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((data) => {
      this.articleId = Number(data.get('id'));
      this.loadComments();
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
    this.commentService.postArticleComment(this.articleId, data).subscribe((comment) => {
      this.posting = false;
      this.insertComment(comment);
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
    this.replyCommentInput = '';
    if (this.replyNodeActive) {
      this.replyNodeActive.reply_field_display = false;
    }
    this.replyNodeActive = node;
    this.replyNodeActive.reply_field_display = true;
  }

  public cancelReplyClick() {
    this.replyNodeActive = null;
  }

  private parseComments() {
    for (const comment of this.comments) {
      // if a comment is root - it's a tree, build a tree from this root
      if (!comment.reply_to) {
        this.buildTree(comment);
      }
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
    this.commentService.postArticleComment(this.articleId, data).subscribe((comment) => {
      this.insertComment(comment);
      this.replyCommentInput = '';
      this.replyNodeActive.reply_field_display = false;
      this.posting = false;
    }, (err) => {
      this.replyErrorsText = 'An unexpected error occurred';
    });
  }

  private loadComments() {
    this.commentService.loadArticleComments(this.articleId, this.cursor).subscribe((page) => {
      this.comments = this.comments.concat(page.results);
      this.cursor = page.next;
      this.commentsHashTable = {};
      for (const comment of this.comments) {
        this.commentsHashTable[comment.id] = comment;
      }
      this.parseComments();
    });
  }

  private buildTree(root: Comment, initialDepth = 0) {
    this.commentsTree.push({depth: initialDepth, comment: root, reply_field_display: false});
    for (const reply of root.replies) {
      // get comment from the hash table, and build a tree from it
      const comment = this.commentsHashTable[reply];
      this.buildTree(comment, initialDepth + 1);
    }
  }

  private insertComment(commentToAdd: Comment) {
    // inserts comment in the comment tree
    if (commentToAdd.reply_to) {
      const parentIndex = this.commentsTree.findIndex(c => c.comment.id === commentToAdd.reply_to);
      const node = {
        comment: commentToAdd,
        depth: this.commentsTree[parentIndex].depth + 1,
        reply_field_display: false
      };
      this.commentsTree.splice(parentIndex + 1, 0, node);
    } else {
      const node = {
        comment: commentToAdd,
        depth: 0,
        reply_field_display: false
      };
      this.commentsTree.unshift(node);
    }
  }
}
