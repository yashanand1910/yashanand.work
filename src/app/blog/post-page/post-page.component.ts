import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '@app/model/blog';
import { first, map, switchMap } from 'rxjs';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {
  post: Partial<Post> = {};
  isPostLoading = true;
  isContentLoading = true;

  constructor(private route: ActivatedRoute, private blogService: BlogService) {}

  ngOnInit(): void {
    this.loadPage();
  }

  loadPage() {
    this.isPostLoading = true;
    // return;
    this._getPostId()
      .pipe(switchMap((id) => this.blogService.getPage(id)))
      .pipe(first())
      .subscribe((post) => {
        this.isPostLoading = false;
        this.post = post;
        this.getContent();
      });
  }

  getContent() {
    this.isContentLoading = true;
    this._getPostId()
      .pipe(switchMap((id) => this.blogService.getPageContent(id)))
      .pipe(first())
      .subscribe(() => {
        this.isContentLoading = false;
      });
  }

  // Get page ID from URL params
  private _getPostId() {
    return this.route.params.pipe(map((params) => params['id'] as string));
  }
}
