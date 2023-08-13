import { Component, Input } from '@angular/core';
import { Block, BlockType } from '@app/model/blog';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss']
})
export class BlockComponent {
  @Input() block: Partial<Block> = {};

  public get blockType(): typeof BlockType {
    return BlockType;
  }
}
