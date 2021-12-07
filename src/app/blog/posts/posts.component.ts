import { Component, OnInit } from '@angular/core';
import { Post } from '@model/blog';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  posts$!: Observable<Post[]>;

  constructor() {}

  ngOnInit(): void {
    this.posts$ = of([
      {
        id: '001',
        author: 'Yash Anand',
        title: 'Bicycle for the Mind',
        dateAdded: new Date('2022-02-07T20:42:02+00:00'),
        dateUpdated: new Date(),
        wordCount: 500,
        tags: ['daily', 'principles']
      },
      {
        id: '002',
        author: 'Yash Anand',
        title: 'How to Develop a Progressive Web App',
        dateAdded: new Date('2022-02-07T20:42:02+00:00'),
        dateUpdated: new Date(),
        wordCount: 4000,
        tags: ['dev', 'angular']
      },
      {
        id: '003',
        author: 'Yash Anand',
        title: 'CI/CD Patterns & Creating your Own',
        dateAdded: new Date('2022-02-07T20:42:02+00:00'),
        dateUpdated: new Date(),
        wordCount: 3000,
        tags: ['dev', 'ci/cd']
      }
    ]);
  }
}
