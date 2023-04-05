import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const loginData = {
      email: email,
      password: password
    };
    return this.http.post<any>(`${this.apiUrl}/login`, loginData);
  }

  isAuthenticated(): Observable<boolean> {
    return this.http.get<any>(`${this.apiUrl}/isAuthenticated`).pipe(
      map(response => {
        if (response.authenticated && response.role === 'Admin') {
          return true;
        } else {
          return false;
        }
      })
    );
  }
}
