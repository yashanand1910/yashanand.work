import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { PostsComponent } from '@app/blog/posts/posts.component';
import { PostPageComponent } from '@app/blog/post-page/post-page.component';
import { SearchComponent } from '@app/blog/options/search/search.component';
import { ChaptersComponent } from '@app/blog/options/chapters/chapters.component';

const routes: Routes = [
  // Module is lazy loaded, see app-routing.module.ts
  {
    path: '',
    children: [
      {
        path: '',
        component: PostsComponent,
        data: { title: marker('Blog Posts') }
      },
      {
        path: '',
        component: SearchComponent,
        pathMatch: 'full',
        outlet: 'options'
      },
      {
        path: ':id',
        children: [
          {
            path: '',
            component: PostPageComponent
          },
          {
            path: '',
            component: ChaptersComponent,
            outlet: 'options'
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule {}
