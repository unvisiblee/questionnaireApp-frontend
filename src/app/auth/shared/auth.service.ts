import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SignupRequestPayload} from '../signup/signup-request.payload';
import {Observable} from 'rxjs';
import {LoginRequestPayload} from '../login/login-request.payload';
import {LocalStorageService} from 'ngx-webstorage';
import {map} from 'rxjs/operators';
import {LoginResponsePayload} from '../login/login-response.payload';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private authUrl = environment.apiUrl + 'api/auth';

  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();


  constructor(private httpClient: HttpClient, private localStorage: LocalStorageService) { }

  signup(signupRequestPayload: SignupRequestPayload): Observable<any> {
    return this.httpClient.post(this.authUrl + '/signup' , signupRequestPayload, {responseType: 'text'});
  }


  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    return this.httpClient.post<LoginResponsePayload>(this.authUrl + '/login', loginRequestPayload).pipe(map(data => {
      this.localStorage.store('username', data.username);
      this.localStorage.store('token', data.authToken);
      return true;
    }));
}

  getUsername(): string | null {
    console.log(this.localStorage.retrieve('username'));
    return this.localStorage.retrieve('username');
  }

  getToken(): string | null {
    return this.localStorage.retrieve('token');
  }

  isLoggedIn(): boolean {
    return this.getToken() != null;
  }
}
