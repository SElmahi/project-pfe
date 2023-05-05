import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Author } from '../models/Author';
import { Submission } from '../models/Submission';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubmitService {
  private apiUrl = 'http://localhost:8080/api';
  private registerAttendeeUrl = this.apiUrl + '/attendees/registerr';
  private submitPaperUrl = this.apiUrl + '/submissions/submit';
  private addSubmissionUrl = this.apiUrl + '/submissions/addSubmission';


  constructor(private http: HttpClient) {}
  registerAttendee(name: string, familyName: string, email: string, payment: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('name', name);
    formData.append('familyName', familyName);
    formData.append('email', email);
    formData.append('paymentProof', payment);
  
    const httpOptions = {
      responseType: 'text' as 'json'
    };
    
    return this.http.post<any>(this.registerAttendeeUrl, formData, httpOptions);
  }
  

  submitPaper(formData: any, paper: File): Observable<any> {
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

    

    const httpOptions = {
      responseType: 'text' as 'json'
    };
    return this.http.post<any>(this.submitPaperUrl, submissionData, httpOptions);
  }
  getSubmissionById(id: string): Observable<Submission> {
    return this.http.get<Submission>(`${this.apiUrl}/submissions/${id}`);
  }

  updateSubmission(id: number, submission: Submission, paper: File): Observable<any> {
    const formData = new FormData();
  
    // Create an object containing the updated submission properties
    const updatedSubmissionData = {
      title: submission.title,
      abstractText: submission.abstractText,
      keywords: submission.keywords,
      submissionType: submission.submissionType,
      customId: submission.customId 
    };
  
    // Append the object as a JSON string with the key 'submission'
    formData.append('submission', new Blob([JSON.stringify(updatedSubmissionData)], { type: 'application/json' }));
  
    if (paper) {
      formData.append('paper', paper);
    }
  
    return this.http.put(`${this.apiUrl}/submissions/${id}`, formData, {
      headers: {
       
      },
    });
  }
  
    
  addSubmission(formData: any, paper: File, authorId: number): Observable<any> {
    const submissionData = new FormData();
    submissionData.append('title', formData.title);
    submissionData.append('abstractText', formData.abstractText);
    submissionData.append('keywords', formData.keywords);
    submissionData.append('paper', paper);
    submissionData.append('submissionType', formData.submissionType);
    submissionData.append('authorId', authorId.toString());
  
    console.log('Form data:', submissionData);
    const httpOptions = {
      responseType: 'json' as 'json'
    };
  
    return this.http.post<any>(this.addSubmissionUrl, submissionData, httpOptions);
  }
 
  
  uploadPaymentFile(paymentFile: File, submissionId: number): Observable<any> {
    const formData = new FormData();
    formData.append('paymentFileName', paymentFile);
    formData.append('submissionId', submissionId.toString());
   
    return this.http.post(`${this.apiUrl}/submissions/uploadPayment`, formData, {
      responseType: 'text' // Add this line to specify the expected response type
    });
   
  }

  
  
}