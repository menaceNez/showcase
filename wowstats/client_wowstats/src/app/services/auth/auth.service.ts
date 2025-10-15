import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl: string = 'http://localhost:3000';
  private user?: User;
  private userKey = 'user';

  constructor(private http: HttpClient, private router: Router) {}
  /* */
  login(username: string, password: string): Observable<any> {
    return this.http
      .post<string>(
        `${this.apiUrl}/login`,
        { username, password },
        { withCredentials: true }
      )
      .pipe(
        tap((usernameResponse: string) => {
          this.user = {
            username: usernameResponse,
            password: '',
          };

          console.log('This should be the user: ', this.user.username);
          localStorage.setItem(this.userKey, this.user.username);
        })
      );
  }

  isLoggedIn(): boolean {
    const isLogged = !!localStorage.getItem('user');
    console.log('Are we logged in? ', isLogged);
    return isLogged;
  }

  logout(): Observable<any> {
    localStorage.removeItem('user');
    this.user = undefined;
    this.router.navigate(['/login']);

    return this.http.get<any>(this.apiUrl + '/logout');
  }
}
