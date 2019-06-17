import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from './user';
import { apiUrl } from '../globals';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

const httpOptions: any = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  responseType: 'text'
};
// httpOptions.headers.set();
// httpOptions.headers.set("Accept", "application/json");

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;


  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
  isLoggedIn() {
    if (localStorage.getItem("çurrentUser")) {
      return true;
    } else {
      return false;
    }
  }

  login(user) {
    if (user.username !== '' && user.password !== '') { // {3}
     return this.http.post(`${apiUrl}/auth/login`, user, httpOptions).pipe(map((data: any) => { // not callback
        // login successful if there's a jwt token in the response
        let dataJson = JSON.parse(data);
        if (dataJson && dataJson.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', dataJson);
          this.currentUserSubject.next(dataJson);
        }
        return dataJson;
      }, error => {
        console.error("Error", error);
        return error;
      }));

    }
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}