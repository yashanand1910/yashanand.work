import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '@app/model/blog';
import { environment } from '@env/environment';
import {
  BlockObjectResponse,
  PageObjectResponse,
  PartialPageObjectResponse,
  QueryDatabaseParameters,
  QueryDatabaseResponse
} from '@notionhq/client/build/src/api-endpoints';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  private databaseId = environment.notion.databaseId!;

  constructor(private http: HttpClient) {}

  private queryDatabase(id: string, query: Partial<QueryDatabaseParameters>) {
    return this.http.post<QueryDatabaseResponse>(`/databases/${id}/query`, JSON.stringify(query));
  }

  private retrievePage(id: string) {
    return this.http.get<PageObjectResponse>(`/pages/${id}`);
  }

  private retrieveBlock(id: string) {
    return this.http.get<BlockObjectResponse>(`/blocks/${id}`);
  }

  getPages(pageSize: number, startCursor?: string) {
    return this.queryDatabase(this.databaseId, {
      page_size: pageSize,
      start_cursor: startCursor ? startCursor : undefined
    }).pipe(
      map((response: QueryDatabaseResponse) => {
        const posts = response.results.map<Partial<Post>>((page: PageObjectResponse | PartialPageObjectResponse) => {
          return this.parsePage(page as PageObjectResponse);
        });
        return {
          posts: posts,
          nextCursor: response.next_cursor as string
        };
      })
    );
  }

  getPage(id: string) {
    return this.retrievePage(id).pipe(
      map((page) => {
        return this.parsePage(page);
      })
    );
  }

  getPageContent(id: string) {
    return this.retrieveBlock(id).pipe(
      map((block) => {
        console.debug(block);
        return block;
      })
    );
  }

  /***************
   *  UTILITIES  *
   ***************/

  private parsePage(page: PageObjectResponse) {
    return {
      id: page.id,
      author: this._getUserName(page, 'Created by'),
      title: this._getText(page, 'Title'),
      created: new Date(page.created_time),
      edited: new Date(page.last_edited_time),
      editedBy: this._getUserName(page, 'Last edited by'),
      tags: this._getMultiSelect(page, 'Tags')
    };
  }

  private _getText(page: PageObjectResponse, name: string) {
    return page.properties[name][this.lowerSnakeCase(name)][0]['plain_text'];
  }

  private _getUserName(page: PageObjectResponse, name: string) {
    return page.properties[name][this.lowerSnakeCase(name)]['name'];
  }

  private _getMultiSelect(page: PageObjectResponse, name: string) {
    return page.properties[name]['multi_select'];
  }

  private lowerSnakeCase = (str: string) => str.toLowerCase().split(' ').join('_');
}
