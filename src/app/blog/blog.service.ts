import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Block, BlockType, Post } from '@app/model/blog';
import { environment } from '@env/environment';
import {
  BlockObjectResponse,
  DatabaseObjectResponse,
  ListBlockChildrenResponse,
  PageObjectResponse,
  PartialBlockObjectResponse,
  PartialDatabaseObjectResponse,
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

  private retrieveBlockChildren(id: string) {
    return this.http.get<ListBlockChildrenResponse>(`/blocks/${id}/children`);
  }

  getPages(pageSize: number, startCursor?: string) {
    return this.queryDatabase(this.databaseId, {
      page_size: pageSize,
      start_cursor: startCursor,
      filter: {
        property: 'Tags',
        multi_select: {
          does_not_contain: 'Draft'
        }
      }
    }).pipe(
      map((response: QueryDatabaseResponse) => {
        const posts = response.results.map<Partial<Post>>(
          (
            page:
              | PageObjectResponse
              | PartialPageObjectResponse
              | PartialDatabaseObjectResponse
              | DatabaseObjectResponse
          ) => {
            return BlogService.parsePage(page as PageObjectResponse);
          }
        );
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
        return BlogService.parsePage(page);
      })
    );
  }

  getPageContent(id: string) {
    return this.retrieveBlockChildren(id).pipe(
      map((response: ListBlockChildrenResponse) => {
        const blocks = response.results.reduce(
          (acc: Block[], block: BlockObjectResponse | PartialBlockObjectResponse) => {
            // We accumulate numbered/bulleted list items nested lists
            const parsedBlock = BlogService.parseBlock(block as BlockObjectResponse);
            const lastBlock = acc.length > 0 ? acc[acc.length - 1] : null;

            switch (parsedBlock.type) {
              case BlockType.NUMBERED_LIST_ITEM:
                // If list ongoing, append to it otherwise create a new list
                if (lastBlock && lastBlock.type == BlockType.NUMBERED_LIST) {
                  lastBlock.listItems?.push(parsedBlock);
                } else {
                  acc.push({
                    type: BlockType.NUMBERED_LIST,
                    hasChildren: false,
                    richText: [],
                    listItems: [parsedBlock]
                  });
                }
                break;
              case BlockType.BULLETED_LIST_ITEM:
                // If list ongoing, append to it otherwise create a new list
                if (lastBlock && lastBlock.type == BlockType.BULLETED_LIST) {
                  lastBlock.listItems?.push(parsedBlock);
                } else {
                  acc.push({
                    type: BlockType.BULLETED_LIST,
                    hasChildren: false,
                    richText: [],
                    listItems: [parsedBlock]
                  });
                }
                break;
              default:
                acc.push(parsedBlock);
                break;
            }

            return acc;
          },
          []
        );

        // const blocks = response.results.map<Block>((block: BlockObjectResponse | PartialBlockObjectResponse) => {
        //   return BlogService.parseBlock(block as BlockObjectResponse);
        // });
        return blocks;
      })
    );
  }

  /***************
   *  UTILITIES  *
   ***************/

  private static parseBlock(block: BlockObjectResponse): Block {
    return {
      hasChildren: block.has_children,
      type: BlockType[block.type.toUpperCase()],
      richText: block[block.type]['rich_text']
    };
  }

  private static parsePage(page: PageObjectResponse): Post {
    return {
      id: page.id,
      author: this.getUserName(page, 'Created by'),
      title: this.getText(page, 'Title'),
      created: new Date(page.created_time),
      edited: new Date(page.last_edited_time),
      editedBy: this.getUserName(page, 'Last edited by'),
      tags: this.getMultiSelect(page, 'Tags')
    };
  }

  private static getText(page: PageObjectResponse, name: string) {
    return page.properties[name][this.lowerSnakeCase(name)][0]['plain_text'];
  }

  private static getUserName(page: PageObjectResponse, name: string) {
    return page.properties[name][this.lowerSnakeCase(name)]['name'];
  }

  private static getMultiSelect(page: PageObjectResponse, name: string) {
    return page.properties[name]['multi_select'];
  }

  private static lowerSnakeCase = (str: string) => str.toLowerCase().split(' ').join('_');
}
