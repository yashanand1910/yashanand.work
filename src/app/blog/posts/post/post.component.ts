import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '@model/blog';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {
  @Input() post: Partial<Post> | undefined;
  @Input() isLoadingPlaceholder = false;

  constructor(private router: Router) {
    // empty
  }
}
