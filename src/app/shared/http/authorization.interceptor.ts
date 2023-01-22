import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

/**
 * Add Notion authorization headers (see https://developers.notion.com/docs/authorization)
 */
@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({
      headers: request.headers
        .set('Authorization', `Bearer ${environment.notion.secret}`)
        .set('Notion-Version', environment.notion.version)
        .set('Content-Type', 'application/json')
    });
    return next.handle(request);
  }
}
