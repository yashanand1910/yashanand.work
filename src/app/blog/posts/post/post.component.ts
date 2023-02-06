import { Component, OnInit, Input } from '@angular/core';
import { Post } from '@model/blog';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {
  @Input() post: Post | undefined;

  constructor() {
    // empty
  }
}
