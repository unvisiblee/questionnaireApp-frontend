import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SignupRequestPayload} from '../signup/signup-request.payload';
import {Observable} from 'rxjs';
import {LoginRequestPayload} from '../login/login-request.payload';
import {LocalStorageService} from 'ngx-webstorage';
import {map} from 'rxjs/operators';
import {LoginResponsePayload} from '../login/login-response.payload';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private localStorage: LocalStorageService) { }

  signup(signupRequestPayload: SignupRequestPayload): Observable<any> {
    return this.httpClient.post('http://localhost:8080/api/auth/signup', signupRequestPayload, {responseType: 'text'});
  }

  // tslint:disable-next-line:typedef
  // @ts-ignore
  // tslint:disable-next-line:typedef
  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    return this.httpClient.post<LoginResponsePayload>('http://localhost:8080/api/auth/login', loginRequestPayload).pipe(map(data => {
      this.localStorage.store('username', data.username);
      this.localStorage.store('token', data.authToken);

      return true;
    }));
}
}
