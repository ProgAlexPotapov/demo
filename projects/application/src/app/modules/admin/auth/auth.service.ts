import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { User, Role } from './models';
import { Store} from '@ngrx/store';
import { authAdmin, authNoAdmin } from '../../../core/auth/auth.actions';
import { AppState } from '../../../core/core.state';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private store: Store<AppState>) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('app-User')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    // console.log('Get User', this.currentUserSubject.value);
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('app-User', JSON.stringify(user));
          this.currentUserSubject.next(user);

          if (this.currentUserSubject.value.role === Role.Admin) {
            this.store.dispatch(authAdmin());
          } else {
            this.store.dispatch(authNoAdmin());
          }
        }
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('app-User');
    this.currentUserSubject.next(null);
  }
}
