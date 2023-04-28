import { Component } from '@angular/core';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';


import * as DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';

import { PageServiceService } from 'src/app/services/page-service.service';
import { AdminService } from 'src/app/services/admin.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-dasboard',
  templateUrl: './admin-dasboard.component.html',
  styleUrls: ['./admin-dasboard.component.css'],
})
export class AdminDasboardComponent {
  public Editor = DecoupledEditor as any;
  public selectedTab: string = 'content'; // Default selected tab

 
  displayedColumns: string[] = ['title', 'abstractText', 'keywords', 'submissionState', 'submissionDate', 'submissionType', 'authorName', 'affiliation'];

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
  public submissions = [];
  public attendees = [];
  constructor(private pageServiceService: PageServiceService,private adminService : AdminService,private router :Router) {
    this.loadSubmissions();
    this.loadAttendees(); // Add this line
  }

  
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
        this.contentAffiche = {
          headerText: response.text,
          headerImageUrl: response.imageUrl,
        };
      
      });
    } else if (this.pageSelected == 'Register') {
      this.pageServiceService.getRegisterPage().subscribe((response: any) => {
        this.contentAffiche = response.registerContent;
       
      });
    } else if (this.pageSelected == 'Committees') {
      this.pageServiceService.getCommitteesPage().subscribe((response: any) => {
        this.contentAffiche = response.content;
       
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
  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  public onReady( editor ) {
    editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
    );
  
}
loadSubmissions() {
  
  this.adminService.getAllSubmissionsWithAuthorInfo().subscribe((data: any[]) => {
    console.log('Received submissions data:', data); // Log the received data
    this.submissions = data;
    console.log('First submission:', this.submissions[0]);
console.log('Author of the first submission:', this.submissions[0].author);
    
  });
 
}
loadAttendees() {
  this.adminService.getAllAttendees().subscribe((data: any[]) => {
    console.log('Received attendees data:', data);
    this.attendees = data;
  });
}

getPaperUrl(subfolder: string, fileName: string): string {
  if (!fileName) {
    console.log('No file name provided');
    return '';
  }

  const normalizedFileName = fileName.replace(/\\/g, '/');
  const subfolderPrefix = subfolder + '/';
  const cleanedFileName = normalizedFileName.startsWith(subfolderPrefix) ? normalizedFileName.slice(subfolderPrefix.length) : normalizedFileName;
  const url = `http://localhost:8080/api/submissions/${subfolder}/${cleanedFileName}`;
  console.log('Generated URL:', url);
  return url;
}
exportToCSV() {
  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.submissions.map(submission => ({
    ID: submission.submission.customId,
    Title: submission.submission.title,
    Abstract: submission.submission.abstractText,
    Keywords: submission.submission.keywords,
    Status: submission.submission.submissionState,
    SubmissionDate: submission.submission.submissionDate,
    AuthorName: submission.author.firstName + ' ' + submission.author.lastName,
    Affiliation: submission.author.affiliation,
    PaymentStatus: submission.submission.paymentStatus,
  })));

  const csvOutput: string = XLSX.utils.sheet_to_csv(ws);

  saveAs(new Blob([csvOutput], { type: 'text/csv;charset=utf-8;' }), 'submissions.csv');
}
exportToExcel() {
  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.submissions.map(submission => ({
    ID: submission.submission.customId,
    Title: submission.submission.title,
    Abstract: submission.submission.abstractText,
    Keywords: submission.submission.keywords,
    Status: submission.submission.submissionState,
    SubmissionDate: submission.submission.submissionDate,
    AuthorName: submission.author.firstName + ' ' + submission.author.lastName,
    Affiliation: submission.author.affiliation,
    PaymentStatus: submission.submission.paymentStatus,
  })));
 
  

  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Submissions');

  const wbout: ArrayBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'submissions.xlsx');
}
exportAttendeeToCSV() {
  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.attendees.map(attendee => ({
    ID: attendee.id,
    Name: attendee.name,
    FamilyName: attendee.familyName,
    Email: attendee.email,
    RegistrationDate: attendee.registerDate,
    RegistrationStatus: attendee.registrationStatus,
  })));

  const csvOutput: string = XLSX.utils.sheet_to_csv(ws);

  saveAs(new Blob([csvOutput], { type: 'text/csv;charset=utf-8;' }), 'attendees.csv');
}

exportAttendeeToExcel() {
  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.attendees.map(attendee => ({
    ID: attendee.id,
    Name: attendee.name,
    FamilyName: attendee.familyName,
    Email: attendee.email,
    RegistrationDate: attendee.registerDate,
    RegistrationStatus: attendee.registrationStatus,
  })));

  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Attendees');

  XLSX.writeFile(wb, 'attendees.xlsx');
}
acceptSubmission(id: number) {
  this.adminService.acceptSubmission(id).subscribe(() => {
    alert('Submission accepted');
    this.loadSubmissions();
  });
}
rejectSubmission(id: number) {
  this.adminService.rejectSubmission(id).subscribe(() => {
    alert('Submission rejected');
    this.loadSubmissions();
  });
}
preventModification(id: number) {
  this.adminService.preventModification(id).subscribe(() => {
    alert('Submission set to In Review');
    this.loadSubmissions();
  });
}

updatePaymentStatus(id: number) {
  this.adminService.updatePaymentStatus(id).subscribe(() => {
    alert('Payment status updated to Paid');
    this.loadSubmissions();
  });
}
updateAttendeePaymentStatus(id: number) {
  this.adminService.updateAttendeePaymentStatus(id).subscribe(() => {
    alert('Payment status updated to Paid');
    this.loadAttendees();
  });
}
logout(): void {
  this.adminService.logout().subscribe(
    () => {
      this.router.navigate(['/admin']);
    },
    (error) => {
      console.error('Failed to logout', error);
    }
  );
}
}