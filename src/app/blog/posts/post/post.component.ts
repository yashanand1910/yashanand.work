import { Component, Input } from '@angular/core';
import { Post } from '@model/blog';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {
  @Input() post: Post | undefined;
  @Input() isLoadingPlaceholder = false;

  constructor() {
    // empty
  }
}
