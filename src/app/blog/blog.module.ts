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

@NgModule({
  declarations: [
    PostsComponent,
    PostComponent,
    PostPageComponent,
    OptionsComponent,
    SearchComponent,
    ChaptersComponent
  ],
  imports: [CommonModule, BlogRoutingModule, TimeagoModule.forChild(), SharedModule]
})
export class BlogModule {}
