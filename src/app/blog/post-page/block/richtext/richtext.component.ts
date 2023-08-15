import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RichText } from '@app/model/blog';

@Component({
  selector: 'app-richtext',
  templateUrl: './richtext.component.html',
  styleUrls: ['./richtext.component.scss']
})
export class RichtextComponent {
  @Input() text: RichText[] | undefined;

  constructor(private router: Router, private route: ActivatedRoute) {}

  openLink(URL: string) {
    if (/^(http|https):/i.test(URL)) {
      window.open(URL, '_blank');
    } else {
      this.router.navigate([`..${URL}`], { relativeTo: this.route });
    }
  }
}
