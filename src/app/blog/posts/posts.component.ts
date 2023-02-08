import { Component, OnInit } from '@angular/core';
import { Post } from '@model/blog';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];
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
    this.blogService.getPostsPage(this.pageSize, startCursor).subscribe((page) => {
      this.isLoading = false;
      this.posts = page.posts;
      this.nextCursor = page.nextCursor;
      if (isNext) {
        this.cursorStack.push(this.nextCursor);
      } else {
        this.cursorStack.pop();
      }
    });
  }

  next() {
    if (!this.hasNext()) return;
    this.getPosts(true, this.nextCursor);
  }

  back() {
    if (!this.hasPrevious()) return;
    this.getPosts(false, this.cursorStack[this.cursorStack.length - 1]);
  }

  hasNext() {
    return this.nextCursor;
  }

  hasPrevious() {
    return this.cursorStack.length > 0;
  }
}
