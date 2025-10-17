import { Injectable } from '@angular/core';
import { RegisterPostData, User } from '../interfaces/auth';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../config';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private baseUrl = API_BASE_URL
  constructor(private http: HttpClient) {}

  registerUser(postData: RegisterPostData): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/users`, postData);
  }

  getUserDetails (email: string, password: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users?email=${email}&password=${password}`);
  }
}
