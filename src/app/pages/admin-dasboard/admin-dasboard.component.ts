import { Component } from '@angular/core';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';

import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

import { PageServiceService } from 'src/app/services/page-service.service';
@Component({
  selector: 'app-admin-dasboard',
  templateUrl: './admin-dasboard.component.html',
  styleUrls: ['./admin-dasboard.component.css'],
})
export class AdminDasboardComponent {
  public Editor = DecoupledEditor as any;
 
    

  public pages = [
    'About',
    'Header',
    'Register',
    'Committees',
    'Call For Papers',
    'Important Dates',
    'Publication Index',
    'ConferenceProgramme',
    'ConferenceVenue',
    'Partners',
  ];

  public pageSelected!: string;
  private editordata;
  public contentAffiche;
  constructor(private pageServiceService: PageServiceService) {}

  save() {
    if (this.pageSelected == 'About') {
      this.pageServiceService.saveAboutPage(this.editordata);
    } else if (this.pageSelected == 'Header') {
      this.pageServiceService.saveHeaderPage(this.editordata);
    } else if (this.pageSelected == 'Register') {
      this.pageServiceService.saveRegisterPage(this.editordata);
    } else if (this.pageSelected == 'Committees') {
      this.pageServiceService.saveCommitteesPage(this.editordata);
    } else if (this.pageSelected == 'Call For Papers') {
      this.pageServiceService.saveCallForPapersPage(this.editordata);
    } else if (this.pageSelected == 'Important Dates') {
      this.pageServiceService.saveImportantDatesPage(this.editordata);
    } else if (this.pageSelected == 'Publication Index') {
      this.pageServiceService.savePublicationIndexPage(this.editordata);
    } else if (this.pageSelected == 'ConferenceProgramme') {
      this.pageServiceService.saveConferenceProgramme(this.editordata);
    } else if (this.pageSelected == 'ConferenceVenue') {
      this.pageServiceService.saveConferenceVenue(this.editordata);
    } else if (this.pageSelected == 'Partners') {
      this.pageServiceService.savePartners(this.editordata);
    } else {
    }
  }
  public onChange({ editor }: ChangeEvent) {
    this.editordata = editor.getData();
  }
  afficheContent() {
    if (this.pageSelected == 'About') {
      this.contentAffiche = this.pageServiceService.getAboutPage();
    } else if (this.pageSelected == 'Header') {
      this.contentAffiche = this.pageServiceService.getHeaderPage();
    } else if (this.pageSelected == 'Register') {
      this.contentAffiche = this.pageServiceService.getRegisterPage();
    } else if (this.pageSelected == 'Committees') {
      this.contentAffiche = this.pageServiceService.getCommitteesPage();
    } else if (this.pageSelected == 'Call For Papers') {
      this.contentAffiche = this.pageServiceService.getCallForPapersPage();
    } else if (this.pageSelected == 'Important Dates') {
      this.contentAffiche = this.pageServiceService.getImportantDatesPage();
    } else if (this.pageSelected == 'Publication Index') {
      this.contentAffiche = this.pageServiceService.getPublicationIndexPage();
    } else if (this.pageSelected == 'ConferenceProgramme') {
      this.contentAffiche = this.pageServiceService.getConferenceProgramme();
    } else if (this.pageSelected == 'ConferenceVenue') {
      this.contentAffiche = this.pageServiceService.getConferenceVenue();
    } else if (this.pageSelected == 'Partners') {
      this.contentAffiche = this.pageServiceService.getPartners();
    } else {
    }
  }

  public onReady( editor ) {
    editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
    );
}
}
