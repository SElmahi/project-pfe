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
      this.pageServiceService.saveAboutPage(this.editordata).subscribe(() => {
        alert('About page saved');
      });
    } else if (this.pageSelected == 'Header') {
      this.pageServiceService.saveHeaderPage(this.editordata).subscribe(() => {
        alert('Header page saved');
      });
    } else if (this.pageSelected == 'Register') {
      this.pageServiceService.saveRegisterPage(this.editordata).subscribe(() => {
        alert('Register page saved');
      });
    } else if (this.pageSelected == 'Committees') {
      this.pageServiceService.saveCommitteesPage(this.editordata).subscribe(() => {
        alert('Committees page saved');
      });
    } else if (this.pageSelected == 'Call For Papers') {
      this.pageServiceService.saveCallForPapersPage(this.editordata).subscribe(() => {
        alert('Call For Papers page saved');
      });
    } else if (this.pageSelected == 'Important Dates') {
      this.pageServiceService.saveImportantDatesPage(this.editordata).subscribe(() => {
        alert('Important Dates page saved');
      });
    } else if (this.pageSelected == 'Publication Index') {
      this.pageServiceService.savePublicationIndexPage(this.editordata).subscribe(() => {
        alert('Publication Index page saved');
      });
    } else if (this.pageSelected == 'ConferenceProgramme') {
      this.pageServiceService.saveConferenceProgramme(this.editordata).subscribe(() => {
        alert('Conference Programme saved');
      });
    } else if (this.pageSelected == 'ConferenceVenue') {
      this.pageServiceService.saveConferenceVenue(this.editordata).subscribe(() => {
        alert('Conference Venue saved');
      });
    } else if (this.pageSelected == 'Partners') {
      this.pageServiceService.savePartners(this.editordata).subscribe(() => {
        alert('Partners saved');
      });
    } else {
    }
  }
  
  public onChange({ editor }: ChangeEvent) {
    this.editordata = editor.getData();
  }
  afficheContent() {
    if (this.pageSelected == 'About') {
      this.pageServiceService.getAboutPage().subscribe((response: any) => {
        this.contentAffiche = response.aboutContent;
        
      });
    } else if (this.pageSelected == 'Header') {
      this.pageServiceService.getHeaderPage().subscribe((response: any) => {
        this.contentAffiche = response.headerContent;
        
      });
    } else if (this.pageSelected == 'Register') {
      this.pageServiceService.getRegisterPage().subscribe((response: any) => {
        this.contentAffiche = response.registerContent;
       
      });
    } else if (this.pageSelected == 'Committees') {
      this.pageServiceService.getCommitteesPage().subscribe((response: any) => {
        this.contentAffiche = response.committeesContent;
       
      });
    } else if (this.pageSelected == 'Call For Papers') {
      this.pageServiceService.getCallForPapersPage().subscribe((response: any) => {
        this.contentAffiche = response.callForPapersContent;
       
      });
    } else if (this.pageSelected == 'Important Dates') {
      this.pageServiceService.getImportantDatesPage().subscribe((response: any) => {
        this.contentAffiche = response.content ; // Set it to an empty string if it's null or undefined
        // ...
      
      });
    } else if (this.pageSelected == 'Publication Index') {
      this.pageServiceService.getPublicationIndexPage().subscribe((response: any) => {
        this.contentAffiche = response.publicationIndexContent;
       
      });
    } else if (this.pageSelected == 'ConferenceProgramme') {
      this.pageServiceService.getConferenceProgramme().subscribe((response: any) => {
        this.contentAffiche = response.conferenceProgramme;
       
      });
    } else if (this.pageSelected == 'ConferenceVenue') {
      this.pageServiceService.getConferenceVenue().subscribe((response: any) => {
        this.contentAffiche = response.conferenceVenue;
       
      });
    } else if (this.pageSelected == 'Partners') {
      this.pageServiceService.getPartners().subscribe((response: any) => {
        this.contentAffiche = response.partnersContent;
       
      });
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
