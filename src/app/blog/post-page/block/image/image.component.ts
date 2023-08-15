import { Component, Input } from '@angular/core';
import { File } from '@app/model/blog';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent {
  @Input() file: File | undefined;
}
