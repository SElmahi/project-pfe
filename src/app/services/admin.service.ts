import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private roleSubject = new BehaviorSubject<string>(null);

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const loginData = {
      username: username,
      password: password,
    };
    console.log(loginData);

    return this.http.post<any>(`${this.apiUrl}/login`, loginData).pipe(
      tap((response) => {
        console.log(response);

        if (response.role) {
          this.roleSubject.next(response.role);
          this.isAuthenticatedSubject.next(true);
        } else {
          this.isAuthenticatedSubject.next(false);
        }
      })
    );
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  getRole(): Observable<string> {
    return this.roleSubject.asObservable();
  }

  checkAuthenticated(): void {
    this.http
      .get<any>(`${this.apiUrl}/isAuthenticated`)
      .subscribe((response) => {
        if (response.authenticated) {
          this.isAuthenticatedSubject.next(true);
          this.roleSubject.next(response.role);
        } else {
          this.isAuthenticatedSubject.next(false);
          this.roleSubject.next(null);
        }
      });
  }
}
