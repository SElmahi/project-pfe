import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const loginData = {
      email: email,
      password: password
    };
    return this.http.post<any>(`${this.apiUrl}/login`, loginData).pipe(
      tap(response => {
        if (response.role === 'Admin') {
          this.isAuthenticatedSubject.next(true);
        }
      })
    );
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  checkAuthenticated(): void {
    this.http.get<any>(`${this.apiUrl}/isAuthenticated`).subscribe(response => {
      if (response.authenticated && response.role === 'Admin') {
        this.isAuthenticatedSubject.next(true);
      } else {
        this.isAuthenticatedSubject.next(false);
      }
    });
  }
}


