import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class PageServiceService {
  private aboutPage;
  private headerPage;
  private CallForPapersPage;
  private importantDatesPage;
  private committeesPage;
  private registerPage;
  private publicationIndexPage;
  private conferenceProgramme;
  private conferenceVenue;
  private partners;
  private baseUrl = 'http://localhost:8080/api/home';
  constructor(private http: HttpClient) {}

  getAboutPage() {
    return this.http.get(`${this.baseUrl}/1`);
  }
  
  saveAboutPage(content: string) {
    return this.http.put(`${this.baseUrl}/1`, { aboutContent: content });
  }
 saveConferenceProgramme(content: string) {
  return this.http.put(`${this.baseUrl}/1/conferenceProgramme`, content);
}
  
  getConferenceProgramme() {
    return this.http.get(`${this.baseUrl}/1`);
  }

  saveConferenceVenue(conferenceContent: any) {
    this.conferenceVenue = conferenceContent;
  }
  getConferenceVenue(): any {
    return this.conferenceVenue;
  }

  savePartners(contentPartners: any) {
    this.partners = contentPartners;
  }

  getPartners() {
    return this.partners;
  }

  saveHeaderPage(content: any) {
    this.headerPage = content;
  }
  getHeaderPage(): any {
    return this.headerPage;
  }

  saveCallForPapersPage(content: any) {
    this.CallForPapersPage = content;
  }
  getCallForPapersPage(): any {
    return this.CallForPapersPage;
  }

  saveImportantDatesPage(content: any) {
    this.importantDatesPage = content;
  }
  getImportantDatesPage(): any {
    return this.importantDatesPage;
  }

  saveCommitteesPage(content: any) {
    this.committeesPage = content;
  }
  getCommitteesPage(): any {
    return this.committeesPage;
  }

  saveRegisterPage(content: any) {
    this.registerPage = content;
  }
  getRegisterPage(): any {
    return this.registerPage;
  }

  savePublicationIndexPage(content: any) {
    this.publicationIndexPage = content;
  }
  getPublicationIndexPage(): any {
    return this.publicationIndexPage;
  }
}
