import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginDetails {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:3000/api/v1/auth';

  login(loginDetails: LoginDetails): Observable<LoginResponse> {

    return this.http.post<LoginResponse>(
      `${this.apiUrl}/login`,
      loginDetails
    );
  }

  
  // Here I check if the browser already has a token
  isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }

  // Removes the JWT from the browser when the user logs out
  //  is an angular frontend feature added to use the jwt 
  logout(): void {
    localStorage.removeItem('token');
  }
}