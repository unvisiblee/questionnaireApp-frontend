import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AuthService} from './auth/shared/auth.service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class TokenInterceptor implements HttpInterceptor {


  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.indexOf('login') !== -1 || req.url.indexOf('sign-up') !== -1) {
      return next.handle(req);
    }

    const jwtToken = this.authService.getToken();

    if (jwtToken) {
      return next.handle(this.addToken(req, jwtToken));
    }

    return next.handle(req);
  }

  addToken(req: HttpRequest<any>, jwtToken: string): HttpRequest<any> {
    return req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + jwtToken)
    })
  }
}
