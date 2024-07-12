import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from './authentication.service';
import { HttpClient } from '@angular/common/http';
import { RequestBaseService } from './request-base.service';
import { Observable } from 'rxjs';

const API_URL = environment + '/learn-auth/api/users/admins';

@Injectable({
  providedIn: 'root',
})
export class UserService extends RequestBaseService {
  constructor(authenticationService: AuthenticationService, http: HttpClient) {
    super(authenticationService, http);
  }

  changeRole(newRole: string): Observable<any> {
    return this.http.patch(API_URL + newRole, {}, { headers: this.getHeaders });
  }
}
