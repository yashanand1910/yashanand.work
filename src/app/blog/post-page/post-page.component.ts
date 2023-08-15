import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Block, Post } from '@app/model/blog';
import { Logger } from '@app/shared';
import { concatMap, first, map } from 'rxjs';
import { BlogService } from '../blog.service';
import { BlockComponent } from './block/block.component';
import { TextBlockComponent } from './block/text-block/text-block.component';
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
      .pipe(map(() => this.renderContent()))
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
   * @brief Render each block by inserting appropriate
   *        components into `contentHost`
   *
   * @pre   `content` should be initialized
   */
  renderContent() {
    const contentHostRef = this.appContent.viewContainerRef;
    contentHostRef.clear();

    this.content.forEach((block: Block) => {
      const { component, input } = this.getComponentForBlock(block);
      const blockRef = contentHostRef.createComponent<BlockComponent>(component);
      blockRef.instance.block = input;
    });
  }

  /**
   * @brief Get appropriate component for a Notion `block`
   *
   * @param block Block to get component for
   *
   * @return  And object containing `BlockComponent`, Input to `BlockComponent`
   */
  getComponentForBlock(block: Block) {
    return { component: TextBlockComponent, input: block };
  }

  /**
   * @brief Get `postId` from URL params
   */
  private retrievePostId() {
    return this.route.params.pipe(map((params) => (this.postId = params['id'])));
  }
}
