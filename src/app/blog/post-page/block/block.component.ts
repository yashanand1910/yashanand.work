import { Component, Input, OnInit } from '@angular/core';
import { Block, BlockType, File, RichText } from '@app/model/blog';

@Component({
  selector: 'app-block',
  templateUrl: './block.component.html',
  styleUrls: ['./block.component.scss']
})
export class BlockComponent implements OnInit {
  @Input() block!: Block;
  type!: BlockType;
  text: RichText[] | undefined;
  file: File | undefined;
  listItems!: Block[];
  children!: Block[];
  link!: string;

  /** Pre-process the block to fill required fields */
  ngOnInit() {
    // TODO: deal with children
    const { type, richText, listItems, children, file } = this.block;

    this.type = type;
    this.text = richText;
    this.file = file;
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
