import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { jwtDecode } from 'jwt-decode';

const API_URL = environment.BASE_URL + '/learn-auth/api/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public currentUser: Observable<User>;
  public currentUserSubject: BehaviorSubject<User>;

  constructor(private http: HttpClient) {
    let storageUser;
    const storagerUserAsString = localStorage.getItem('currentUser');
    if (storagerUserAsString) {
      storageUser = JSON.parse(storagerUserAsString);
    }

    console.log(storageUser);

    this.currentUserSubject = new BehaviorSubject<User>(
      storageUser?.token
        ? { ...jwtDecode(storageUser.token), token: storageUser.token }
        : ({} as any),
    );
    this.currentUser = this.currentUserSubject.asObservable();
    console.log(this.currentUser);
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(user: User): Observable<User> {
    return this.http.post<any>(API_URL + '/login', user).pipe(
      map((response) => {
        if (response) {
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.currentUserSubject.next({
            ...jwtDecode(response.token),
            token: response.token,
          });
        }
        return response;
      }),
    );
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(API_URL + '/signup', user);
  }

  logOut() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(new User());
  }
}
