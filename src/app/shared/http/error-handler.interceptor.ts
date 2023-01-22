import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '@env/environment';
import { Logger } from '@app/shared';

/**
 * Adds a default error handler to all requests.
 */
@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError((error) => ErrorHandlerInterceptor.errorHandler(error)));
  }

  // Customize the default error handler here if needed
  static errorHandler(response: HttpEvent<unknown>): Observable<HttpEvent<unknown>> {
    if (!environment.production) {
      // Do something with the error
      const log = new Logger('ErrorHandlerInterceptor');
      log.error('Request error', `${response['status']}: ${response['statusText']} - ${response['message']}`);
    }
    throw response;
  }
}
