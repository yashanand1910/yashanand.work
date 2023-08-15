import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

/**
 * Add Notion authorization headers (see https://developers.notion.com/docs/authorization)
 */
@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let headers: HttpHeaders;
    if (environment.production) {
      headers = request.headers
        .set('Notion-Version', environment.notion.version)
        .set('Content-Type', 'application/json');
    } else {
      // For dev we set it directly from environment
      headers = request.headers
        .set('Notion-Version', environment.notion.version)
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${environment.notion.secret}`);
    }

    request = request.clone({
      headers
    });
    return next.handle(request);
  }
}
