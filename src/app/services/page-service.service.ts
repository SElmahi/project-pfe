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
  private baseUrl = 'http://localhost:8080/api'
  constructor(private http: HttpClient) {}

  getAboutPage() {
    return this.http.get(`${this.baseUrl}/home/1`);
  }
  
  saveAboutPage(content: string) {
    return this.http.put(`${this.baseUrl}/home/1`, { aboutContent: content });
  }
 saveConferenceProgramme(content: string) {
  return this.http.put(`${this.baseUrl}/home/1/conferenceProgramme`, content);
}
  
  getConferenceProgramme() {
    return this.http.get(`${this.baseUrl}/home/1`);
  }

  saveConferenceVenue(content: string) {
    return this.http.put(`${this.baseUrl}/home/1/conferenceVenue`, content);
  }
    
    getConferenceVenue() {
      return this.http.get(`${this.baseUrl}/home/1`);
    }
  
    savePartners(contentPartners: any) {
      return this.http.put(`${this.baseUrl}/partners`, { content: contentPartners });
    }
  
    getPartners() {
      return this.http.get(`${this.baseUrl}/partners`);
    }
  
    saveHeaderPage(content: any) {
      return this.http.put(`${this.baseUrl}/header/${content.id}`, {
        text: content.headerText,
        imageUrl: content.headerImageUrl,
      });
    }
  
  getHeaderPage() {
    return this.http.get(`${this.baseUrl}/header/1`);
  }
  
    saveCallForPapersPage(content: any) {
      return this.http.put(`${this.baseUrl}/callforpapers`, { content: content });
    }
  
    getCallForPapersPage(): any {
      return this.http.get(`${this.baseUrl}/callforpapers`);
    }
  
    saveImportantDatesPage(content: any) {
      return this.http.put(`${this.baseUrl}/importantdates/1`,  content );
    }
  
    getImportantDatesPage(): any {
      return this.http.get(`${this.baseUrl}/importantdates/1`);
    }
  
    saveCommitteesPage(content: any) {
      return this.http.put(`${this.baseUrl}/committees`, { content: content });
    }
  
    getCommitteesPage(): any {
      return this.http.get(`${this.baseUrl}/committees`);
    }
  
    saveRegisterPage(content: any) {
      return this.http.put(`${this.baseUrl}/register`, { content: content });
    }
  
    getRegisterPage(): any {
      return this.http.get(`${this.baseUrl}/register`);
    }
  
    savePublicationIndexPage(content: any) {
      return this.http.put(`${this.baseUrl}/publicationindex`, { content: content });
    }
  
    getPublicationIndexPage(): any {
      return this.http.get(`${this.baseUrl}/publicationindex`);
    }
}
