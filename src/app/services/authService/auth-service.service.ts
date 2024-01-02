// authentication.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/auth'; 
  private loggedInUser: any; 

  constructor(private http: HttpClient) {}

  login(credentials: { lastName: string; password: string }, options?: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials, options);
  }

  setLoggedInUser(user: any): void {
    this.loggedInUser = user;
  }

  getLoggedInUser(): any {
    return this.loggedInUser;
  }

}
