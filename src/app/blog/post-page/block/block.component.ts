import { Block, BlockType } from '@app/model/blog';

export interface BlockComponent {
  block: Partial<Block>;

  types: typeof BlockType;
}
