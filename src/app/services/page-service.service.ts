import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, switchMap } from 'rxjs';
import { Images } from '../models/Image';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


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
  sponsor1URL = new BehaviorSubject<SafeUrl | string>('assets/image/logo1.jpg');
sponsor2URL = new BehaviorSubject<SafeUrl | string>('assets/image/logo2.png');
sponsor3URL = new BehaviorSubject<SafeUrl | string>('assets/image/logo3.jpg');
sponsor4URL = new BehaviorSubject<SafeUrl | string>('assets/image/logo4.jpg');
venueImageURL = new BehaviorSubject<SafeUrl | string>('assets/image/venue.jpg');

  private baseUrl = 'http://localhost:8080/api'
 
 
  constructor(private http: HttpClient, private sanitizer: DomSanitizer) {}
  logoURL = new BehaviorSubject<SafeUrl | string>('assets/image/logo.png');
  backgroundURL = new BehaviorSubject<SafeUrl | string>('assets/image/conference.jpg');
  

  logoURLObservable = this.logoURL.asObservable();
  backgroundURLObservable = this.backgroundURL.asObservable();
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
      return this.http.put(`${this.baseUrl}/header/email/1`,content); 
    }
  
  getHeaderPage() {
    return this.http.get(`${this.baseUrl}/header/email/1`);
  }
  saveTitle(content: any) {
    return this.http.put(`${this.baseUrl}/header/title/1`,content); 
  }

getTitle() {
  return this.http.get(`${this.baseUrl}/header/title/1`);
}
  
    saveCallForPapersPage(content: any) {
      return this.http.put(`${this.baseUrl}/callforpapers/1`, content );
    }
  
    getCallForPapersPage(): any {
      return this.http.get(`${this.baseUrl}/callforpapers/1`);
    }
  
    saveImportantDatesPage(content: any) {
      return this.http.put(`${this.baseUrl}/importantdates/1`,  content );
    }
  
    getImportantDatesPage(): any {
      return this.http.get(`${this.baseUrl}/importantdates/1`);
    }
  
    saveCommitteesPage(content: any) {
      return this.http.put(`${this.baseUrl}/committees/1`, { content: content });
    }
  
    getCommitteesPage(): any {
      return this.http.get(`${this.baseUrl}/committees/1`);
    }
  
    saveRegisterPage(content: any) {
      return this.http.put(`${this.baseUrl}/registrationdetails/1`, content );
    }
  
    getRegisterPage(): any {
      return this.http.get(`${this.baseUrl}/registrationdetails/1`);
    }
  
    savePublicationIndexPage(content: any) {
      return this.http.put(`${this.baseUrl}/publication-indexations/1`,  content);
    }
  
    getPublicationIndexPage(): any {
      return this.http.get(`${this.baseUrl}/publication-indexations/1`);
    }

    
    uploadImage(file: File, purpose: string): Observable<Images> {
      const formData: FormData = new FormData();
      formData.append('file', file, file.name);
      formData.append('imageName', file.name);
      formData.append('purpose', purpose);
      return this.http.post<Images>('http://localhost:8080/api/images', formData);
    }
    
    
    getImage(imageId: number): Observable<any> {
      return this.http.get(`http://localhost:8080/api/images/${imageId}`, { responseType: 'blob' });
    }
   // pageService.service.ts
   getImageByPurpose(purpose: string): void {
    this.http.get<Images>(`${this.baseUrl}/images/purpose/` + purpose)
      .pipe(switchMap(image => this.getImage(image.id)), map(blob => {
        return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
      }))
      .subscribe(url => {
        if (purpose === 'logo') {
          this.updateLogoURL(url);
        } else if (purpose === 'background') {
          this.updateBackgroundURL(url);
        } else if (purpose.startsWith('sponsor')) {
          const sponsorNumber = purpose.slice(-1); 
          this[`updateSponsor${sponsorNumber}URL`](url); // 
        }
        else if (purpose === 'venue') {
          this.updateVenueImageURL(url);
        }
      });
  }
  
  updateSponsor1URL(url: SafeUrl): void {
    this.sponsor1URL.next(url);
  }
  updateVenueImageURL(url: SafeUrl): void {
    this.venueImageURL.next(url);
  }
  updateSponsor2URL(url: SafeUrl): void {
    this.sponsor2URL.next(url);
  }
  
  updateSponsor3URL(url: SafeUrl): void {
    this.sponsor3URL.next(url);
  }
  
  updateSponsor4URL(url: SafeUrl): void {
    this.sponsor4URL.next(url);
  }
  
    
    updateLogoURL(url: SafeUrl | string) {
      this.logoURL.next(url);
    }
    
    updateBackgroundURL(url: SafeUrl | string) {
      this.backgroundURL.next(url);
    }
    
  }