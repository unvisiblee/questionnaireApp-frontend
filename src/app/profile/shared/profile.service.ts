import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {UserResponsePayload} from '../edit-profile/user-response.payload';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ChangePasswordPayload} from '../change-password/change-password.payload';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private profileApi = environment.apiUrl + 'api/auth/user';

  constructor(private httpClient: HttpClient) { }

  getUserInfoByUsername(username: string): Observable<UserResponsePayload> {
    return this.httpClient.get<UserResponsePayload>(this.profileApi + '/by-username/' + username);
  }

  updateUser(userInfo: UserResponsePayload): Observable<UserResponsePayload> {
    const options = {headers: {'Content-Type': 'application/json'}};
    return this.httpClient.put<UserResponsePayload>(this.profileApi + '/update', JSON.stringify(userInfo), options);
  }

  changePassword(changePasswordPayload: ChangePasswordPayload): Observable<any> {
    const options = {headers: {'Content-Type': 'application/json'}};
    return this.httpClient.put<any>(this.profileApi + '/change-password', JSON.stringify(changePasswordPayload), options);
  }
}
