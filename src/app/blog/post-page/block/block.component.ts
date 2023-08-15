import { Component, Input, OnInit } from '@angular/core';
import { Block, BlockType, RichText } from '@app/model/blog';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss']
})
export class BlockComponent implements OnInit {
  @Input() block!: Block;
  type!: BlockType;
  text!: RichText[];
  listItems!: Block[];
  children!: Block[];
  link!: string;

  /** Pre-process the block to fill required fields */
  ngOnInit() {
    // TODO: deal with children
    const { type, richText, listItems, children } = this.block;

    this.type = type;
    this.text = richText;
    if (listItems != undefined) {
      this.listItems = listItems;
    }
    if (children != undefined) {
      this.children = children;
    }
  }

  public get types(): typeof BlockType {
    return BlockType;
  }
}
