import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    if (token) {
      const tokenizedReq = req.clone({
        // headers: req.headers.set('authorization', 'Bearer ' + token),
        headers: req.headers.set('authorization', token),
      });
      console.log('tokenizedReq = ', tokenizedReq);
      return next.handle(tokenizedReq);
    } else {
      return next.handle(req);
    }
  }
}
