import { Component, OnInit } from '@angular/core';
import { Post } from '@model/blog';
import { first } from 'rxjs';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts: Partial<Post>[] = [];
  isLoading = true;
  private cursorStack: string[] = [];
  private nextCursor = '';
  private pageSize = 3;

  constructor(private blogService: BlogService) {
    // empty
  }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(isNext?: boolean, startCursor?: string) {
    this.isLoading = true;
    this.blogService
      .getPages(this.pageSize, startCursor)
      .pipe(first())
      .subscribe((page) => {
        this.isLoading = false;
        this.posts = page.posts;
        if (isNext) {
          this.cursorStack.push(this.nextCursor);
        } else if (isNext === false) {
          this.cursorStack.pop();
        } else {
          // when undefined
          this.cursorStack = [];
        }
        this.nextCursor = page.nextCursor;
      });
  }

  older() {
    if (!this.hasOlder()) return;
    this.getPosts(true, this.nextCursor);
  }

  newer() {
    if (!this.hasNewer()) return;
    if (this.cursorStack.length > 1) {
      this.getPosts(false, this.cursorStack[this.cursorStack.length - 2]);
    } else {
      this.getPosts();
    }
  }

  hasOlder() {
    return this.nextCursor;
  }

  hasNewer() {
    return this.cursorStack.length > 0;
  }
}
