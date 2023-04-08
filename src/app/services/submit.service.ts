import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SubmitService {
  private apiUrl = 'http://localhost:8080/api/attendees/registerr';

  constructor(private http: HttpClient) {}

  registerAttendee(name: string, familyName: string, email: string, payment: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('attendee', JSON.stringify({ name, familyName, email }));
    formData.append('paper', payment);

    const httpOptions = {
      responseType: 'text' as 'json' // Only keep this line
    };
    return this.http.post<any>(this.apiUrl, formData, httpOptions);
}
}
