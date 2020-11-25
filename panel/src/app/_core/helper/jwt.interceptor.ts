import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from '../../_core';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private _auth: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available;
    let user = this._auth.userValue;
    if (user && user.token) {
      request = request.clone({
        setHeaders: { Authorization: user.token },
      });
    }

    return next.handle(request);
  }
}
