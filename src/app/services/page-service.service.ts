import { Injectable } from '@angular/core';

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
  constructor() {}

  saveAboutPage(content: any) {
    this.aboutPage = content;
  }
  getAboutPage(): any {
    return this.aboutPage;
  }
  saveConferenceProgramme(conferenceContent: any) {
    this.conferenceProgramme = conferenceContent;
  }
  getConferenceProgramme(): any {
    return this.conferenceProgramme;
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
