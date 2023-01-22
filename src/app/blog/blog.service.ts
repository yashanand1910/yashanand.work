import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '@app/model/blog';
import { Logger } from '@app/shared';
import { environment } from '@env/environment';
import { map } from 'rxjs';

const log = new Logger('BlogService');

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  private databaseId = environment.notion.databaseId;

  constructor(private http: HttpClient) {}

  getPosts() {
    const query = {}; // empty query for all posts

    return this.http
      .post<Post[]>(`/databases/${this.databaseId}/query`, JSON.stringify(query))
      .pipe(map((res) => log.debug(res)));
  }
}
