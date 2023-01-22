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
    return this.http.get<Post[]>(`/databases/${this.databaseId}`).pipe(map((res) => log.debug(res)));
  }
}
