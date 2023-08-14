/* eslint-disable @typescript-eslint/no-empty-interface */
export interface Post {
  id: string;
  author: string;
  title: string;
  created: Date;
  edited: Date;
  editedBy: string;
  wordCount?: number; // to derive reading time
  tags?: Tag[];
}

export interface Tag {
  id: string;
  name: string;
  color?: string;
}

export enum BlockType {
  HEADING_1,
  HEADING_2,
  HEADING_3,
  PARAGRAPH,
  BULLETED_LIST_ITEM
}

/**
 * All content on a page is in the form
 * of a list of blocks in Notion
 */
export interface Block {
  hasChildren: boolean;
  type: BlockType;
  richText: RichText[];
}

// TODO: Create an open-source library for Notion rich text rendering
export interface RichText {
  text: RTText;
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string;
  };
}

export interface RTText {
  content: string;
  link: RTLink | null;
}

export interface RTLink {
  url: string;
}
