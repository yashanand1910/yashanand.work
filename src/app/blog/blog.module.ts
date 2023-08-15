import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './posts/post/post.component';
import { PostPageComponent } from './post-page/post-page.component';
import { TimeagoModule } from 'ngx-timeago';
import { SharedModule } from '@shared';
import { OptionsComponent } from './options/options.component';
import { SearchComponent } from './options/search/search.component';
import { ChaptersComponent } from './options/chapters/chapters.component';
import { ContentDirective } from './post-page/content.directive';
import { RichtextComponent } from './post-page/block/richtext/richtext.component';
import { BlockComponent } from './post-page/block/block.component';

@NgModule({
  declarations: [
    ContentDirective,
    PostsComponent,
    PostComponent,
    PostPageComponent,
    OptionsComponent,
    SearchComponent,
    ChaptersComponent,
    BlockComponent,
    RichtextComponent
  ],
  imports: [CommonModule, BlogRoutingModule, TimeagoModule.forChild(), SharedModule]
})
export class BlogModule {}
