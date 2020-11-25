import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUser } from '../user/user.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.apiUrl + 'auth';

  private userSubject: BehaviorSubject<IUser>;
  public user: Observable<IUser>;

  constructor(private http: HttpClient) {
    let obj = JSON.parse(localStorage.getItem('covtim_user'));
    this.userSubject = new BehaviorSubject<IUser>(obj);
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): IUser {
    return this.userSubject.value;
  }

  registerUser(user: IUser): Observable<any> {
    let headers: any = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.post<any>(`${this.baseUrl}/register`, user, {
      headers,
    });
  }

  loginUser(nik: string, password: string) {
    return this.http
      .post<any>(`${this.baseUrl}/login`, { nik, password })
      .pipe(
        map((res) => {
          let user = res['doc'];
          // jwt ? then login succeed!
          if (user && user.token) {
            // store user to localStorage;
            localStorage.setItem('covtim_user', JSON.stringify(user));
            this.userSubject.next(user);
          }

          return user;
        })
      );
  }

  logoutUser() {
    localStorage.removeItem('covtim_user');
    this.userSubject.next(null);
  }
}
