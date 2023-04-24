import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Submission } from '../models/Submission';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:8080/api/auth';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private roleSubject = new BehaviorSubject<string>(null);

  constructor(private http: HttpClient) {
    const userRole = localStorage.getItem('userRole');
    const userEmail = localStorage.getItem('userEmail');
    const sessionExpiration = localStorage.getItem('sessionExpiration');
  
    if (userRole && userEmail && sessionExpiration) {
      const currentTime = new Date().getTime();
      if (currentTime < parseInt(sessionExpiration, 10)) {
        this.isAuthenticatedSubject.next(true);
        this.roleSubject.next(userRole);
      } else {
        this.clearLocalStorage();
      }
    }
  }
   clearLocalStorage() {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('sessionExpiration');
  }
  

  login(email: string, password: string): Observable<any> {
    const loginData = {
      email: email,
      password: password
    };
    return this.http.post<any>(`${this.apiUrl}/login`, loginData).pipe(
      tap(response => {
        if (response.role) {
          this.saveUserDetails(response.role, email, response.id);
          this.roleSubject.next(response.role);
          this.isAuthenticatedSubject.next(true);
        } else {
          this.isAuthenticatedSubject.next(false);
        }
      })
    );
  }

  saveUserDetails(role: string, email: string, id: number) {
    const expirationTime = new Date().getTime() + (10 * 60 * 1000); // 3 minutes
    localStorage.setItem('userRole', role);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userId', id.toString());
    localStorage.setItem('sessionExpiration', expirationTime.toString());
  }
  isSessionExpired(): boolean {
    const expirationTime = localStorage.getItem('sessionExpiration');
    if (!expirationTime) {
      return true;
    }
  
    const currentTime = new Date().getTime();
    return currentTime >= parseInt(expirationTime, 10);
  }

  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  getRole(): Observable<string> {
    return this.roleSubject.asObservable();
  }
  
  checkAuthenticated(): void {
    this.http.get<any>(`${this.apiUrl}/isAuthenticated`).subscribe(response => {
      if (response.authenticated) {
        this.isAuthenticatedSubject.next(true);
        this.roleSubject.next(response.role);
      } else {
        this.isAuthenticatedSubject.next(false);
        this.roleSubject.next(null);
      }
    });
  }
  getAuthorSubmissions(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/api/authors/submissions?id=${id}`);
  }
  getAuthorInfo(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/api/authors/info?id=${id}`);
  }
 
  getAllSubmissionsWithAuthorInfo(): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/api/submissions/all-with-authors`);
  }
  acceptSubmission(id: number) {
    return this.http.put(`http://localhost:8080/api/submissions/${id}/accept`, {});
  }
  rejectSubmission(id: number) {
    return this.http.put(`http://localhost:8080/api/submissions/${id}/reject`, {});
  }
  preventModification(id: number) {
    return this.http.put(`http://localhost:8080/api/submissions/${id}/in-review`, {});
  }
}
