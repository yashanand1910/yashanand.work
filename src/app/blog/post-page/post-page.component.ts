import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Block, Post } from '@app/model/blog';
import { Logger } from '@app/shared';
import { concatMap, first, map } from 'rxjs';
import { BlogService } from '../blog.service';
import { ContentDirective } from './content.directive';

const log = new Logger('PostPage');

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {
  postId: string | undefined = undefined;
  post: Partial<Post> = {};
  content: Block[] = [];
  isPostLoading = true;
  isContentLoading = true;

  @ViewChild(ContentDirective) appContent!: ContentDirective;

  constructor(private route: ActivatedRoute, private blogService: BlogService) {}

  ngOnInit(): void {
    this.retrievePostId()
      .pipe(concatMap(() => this.loadPage()))
      .pipe(concatMap(() => this.loadContent()))
      .subscribe();
  }

  /**
   * @pre `postId` should be initialized
   */
  loadPage() {
    this.isPostLoading = true;
    return this.blogService
      .getPage(this.postId as string)
      .pipe(first())
      .pipe(
        map((post) => {
          log.debug(post);
          this.post = post;
          this.isPostLoading = false;
        })
      );
  }

  /**
   * @pre `postId` should be initialized
   */
  loadContent() {
    this.isContentLoading = true;
    return this.blogService
      .getPageContent(this.postId as string)
      .pipe(first())
      .pipe(
        map((blocks) => {
          log.debug(blocks);
          this.content = blocks;
          this.isContentLoading = false;
        })
      );
  }

  /**
   * @brief Get `postId` from URL params
   */
  private retrievePostId() {
    return this.route.params.pipe(map((params) => (this.postId = params['id'])));
  }
}
