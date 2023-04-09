import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Author } from '../models/Author';

@Injectable({
  providedIn: 'root'
})
export class SubmitService {
  private apiUrl = 'http://localhost:8080/api';
  private registerAttendeeUrl = this.apiUrl + '/attendees/registerr';
  private submitPaperUrl = this.apiUrl + '/submissions/submit';

  constructor(private http: HttpClient) {}

  registerAttendee(name: string, familyName: string, email: string, payment: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('attendee', JSON.stringify({ name, familyName, email }));
    formData.append('paper', payment);

    const httpOptions = {
      responseType: 'text' as 'json'
    };
    return this.http.post<any>(this.registerAttendeeUrl, formData, httpOptions);
  }

  submitPaper(formData: any, paper: File, coAuthors: Author[]): Observable<any> {
    const submissionData = new FormData();
    submissionData.append('email', formData.email);
    submissionData.append('password', formData.password);
    submissionData.append('firstName', formData.firstName);
    submissionData.append('lastName', formData.lastName);
    submissionData.append('affiliation', formData.affiliation);
    submissionData.append('title', formData.title);
    submissionData.append('abstractText', formData.abstractText);
    submissionData.append('keywords', formData.keywords);
    submissionData.append('paper', paper);
    submissionData.append('submissionType', formData.submissionType);

    coAuthors.forEach((coAuthor, index) => {
      submissionData.append(`coAuthorFirstName[${index}]`, coAuthor.firstName);
      submissionData.append(`coAuthorLastName[${index}]`, coAuthor.lastName);
      submissionData.append(`coAuthorEmail[${index}]`, coAuthor.email);
      submissionData.append(`coAuthorAffiliation[${index}]`, coAuthor.affiliation);
    });

    const httpOptions = {
      responseType: 'text' as 'json'
    };
    return this.http.post<any>(this.submitPaperUrl, submissionData, httpOptions);
  }
}
