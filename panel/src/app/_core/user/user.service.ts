import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from './user.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  baseUrl = environment.apiUrl + 'users';
  user: IUser;
  
  // update user by id.
  updateUser(id: string, user: IUser): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, user);
  }

  // update user password.
  updateUserPassword(id: string, newPassword: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/updatePassword/${id}`, newPassword);
  }

  // delete user by id.
  deleteUser(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

  // get all users.
  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.baseUrl}?sort=-createdAt`);
  }

  // get user by id.
  getUser(id: string): Observable<IUser> {
    return this.http.get<IUser>(`${this.baseUrl}/${id}`);
  }
}
