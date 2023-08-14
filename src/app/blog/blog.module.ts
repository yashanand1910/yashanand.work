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
import { TextBlockComponent } from './post-page/block/text-block/text-block.component';
import { RichtextComponent } from './post-page/block/text-block/richtext/richtext.component';

@NgModule({
  declarations: [
    ContentDirective,
    PostsComponent,
    PostComponent,
    PostPageComponent,
    OptionsComponent,
    SearchComponent,
    ChaptersComponent,
    TextBlockComponent,
    RichtextComponent
  ],
  imports: [CommonModule, BlogRoutingModule, TimeagoModule.forChild(), SharedModule]
})
export class BlogModule {}
