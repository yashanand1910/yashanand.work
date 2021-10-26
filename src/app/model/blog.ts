export interface Post {
  id: string;
  author: string;
  title: string;
  dateAdded: Date;
  dateUpdated: Date;
  wordCount: number;
  tags: string[];
}

export interface PostPage extends Post {
  body: string;
}
