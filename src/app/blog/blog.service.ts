import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '@app/model/blog';
import { Logger } from '@app/shared';
import { environment } from '@env/environment';
import {
  PageObjectResponse,
  PartialPageObjectResponse,
  QueryDatabaseParameters,
  QueryDatabaseResponse
} from '@notionhq/client/build/src/api-endpoints';
import { map, Observable } from 'rxjs';

const log = new Logger('BlogService');

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  private databaseId = environment.notion.databaseId!;

  constructor(private http: HttpClient) {}

  private queryDatabase = (id: string, query: Partial<QueryDatabaseParameters>) => {
    return this.http.post<QueryDatabaseResponse>(`/databases/${id}/query`, JSON.stringify(query));
  };

  getPosts = () => {
    return this.queryDatabase(this.databaseId, {}).pipe(
      map((response: QueryDatabaseResponse) => {
        return response.results.map<Post>((res: PageObjectResponse | PartialPageObjectResponse) => {
          const page = <PageObjectResponse>res;
          log.debug(page);
          return {
            id: page.id,
            author: this.getUserName(page, 'Created by'),
            title: this.getText(page, 'Title'),
            created: new Date(page.created_time),
            edited: new Date(page.last_edited_time),
            editedBy: this.getUserName(page, 'Last edited by')
          };
        });
      })
    );
  };

  /***************
   *  UTILITIES  *
   ***************/

  private getText = (page: PageObjectResponse, name: string) => {
    return page.properties[name][name.toLowerCase()][0]['plain_text'];
  };

  private getUserName = (page: PageObjectResponse, name: string) => {
    return page.properties[name][name.toLowerCase().split(' ').join('_')]['name'];
  };
}
