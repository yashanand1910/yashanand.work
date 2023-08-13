import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Block, Post } from '@app/model/blog';
import { Logger } from '@app/shared';
import { first, map, switchMap } from 'rxjs';
import { BlogService } from '../blog.service';

const log = new Logger('PostPage');

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {
  post: Partial<Post> = {};
  content: Block[] = [];
  isPostLoading = true;
  isContentLoading = true;
  placeholderContent: number[] = [1, 2, 3]; // for loading placeholder

  constructor(private route: ActivatedRoute, private blogService: BlogService) {}

  ngOnInit(): void {
    this.loadPage();
  }

  loadPage() {
    this.isPostLoading = true;
    this._getPostId()
      .pipe(switchMap((id) => this.blogService.getPage(id)))
      .pipe(first())
      .subscribe((post) => {
        log.debug(post);
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
      .subscribe((blocks) => {
        log.debug(blocks);
        this.content = blocks;
        this.isContentLoading = false;
      });
  }

  // Get page ID from URL params
  private _getPostId() {
    return this.route.params.pipe(map((params) => params['id'] as string));
  }
}
