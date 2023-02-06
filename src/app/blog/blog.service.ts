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
import { map } from 'rxjs';

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
            author: this._getUserName(page, 'Created by'),
            title: this._getText(page, 'Title'),
            created: new Date(page.created_time),
            edited: new Date(page.last_edited_time),
            editedBy: this._getUserName(page, 'Last edited by'),
            tags: this._getMultiSelect(page, 'Tags')
          };
        });
      })
    );
  };

  /***************
   *  UTILITIES  *
   ***************/

  private _getText = (page: PageObjectResponse, name: string) => {
    return page.properties[name][this.lowerSnakeCase(name)][0]['plain_text'];
  };

  private _getUserName = (page: PageObjectResponse, name: string) => {
    return page.properties[name][this.lowerSnakeCase(name)]['name'];
  };

  private _getMultiSelect = (page: PageObjectResponse, name: string) => {
    return page.properties[name]['multi_select'];
  };

  private lowerSnakeCase = (str: string) => str.toLowerCase().split(' ').join('_');
}
