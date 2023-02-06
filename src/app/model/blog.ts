export interface Post {
  id: string;
  author: string;
  title: string;
  created: Date;
  edited: Date;
  editedBy: string;
  wordCount?: number; // to derive reading time
  tags?: string[];
}

export interface PostPage extends Post {
  body: string;
}
