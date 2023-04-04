// submit.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubmitService {
  private apiUrl = 'http://localhost:8080/api/attendees/registerr';

  constructor(private http: HttpClient) {}

  registerAttendee(name: string, familyName: string, email: string): Observable<any> {
    const body = {
      name,
      familyName,
      email
    };

    return this.http.post<any>(this.apiUrl, body);
  }
}