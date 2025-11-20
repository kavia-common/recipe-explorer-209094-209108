import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

/**
 * PUBLIC_INTERFACE
 * Global HTTP error interceptor that logs errors. Can be extended to show toasts.
 */
export function errorInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      console.error('HTTP error:', err.status, err.message);
      return throwError(() => err);
    })
  );
}
