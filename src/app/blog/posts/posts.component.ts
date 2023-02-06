import { Component, OnInit } from '@angular/core';
import { Post } from '@model/blog';
import { Observable } from 'rxjs';
import { BlogService } from '../blog.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts$!: Observable<Post[]>;

  constructor(private blogService: BlogService) {
    // empty
  }

  ngOnInit(): void {
    this.posts$ = this.blogService.getPosts();

    // this.posts$ = of([
    //   {
    //     id: '001',
    //     author: 'Yash Anand',
    //     title: 'Bicycle for the Mind',
    //     created: new Date('2022-02-07T20:42:02+00:00'),
    //     edited: new Date(),
    //     editedBy: '',
    //     wordCount: 500,
    //     tags: ['daily', 'principles']
    //   }
    // ]);
  }
}
