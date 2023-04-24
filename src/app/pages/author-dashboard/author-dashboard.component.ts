import { Component, OnInit } from '@angular/core';
import { AdminService } from './../../services/admin.service';

import { Router, NavigationEnd } from '@angular/router';
import { SubmitService } from 'src/app/services/submit.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-author-dashboard',
  templateUrl: './author-dashboard.component.html',
  styleUrls: ['./author-dashboard.component.css']
})
export class AuthorDashboardComponent implements OnInit {
  submissions: any[] = [];
  displayedColumns: string[] = ['title', 'abstractText', 'keywords', 'submissionStatus', 'submissionDate', 'submissionType'];


  constructor(private adminService: AdminService, private router: Router, private submitService: SubmitService, private snackBar: MatSnackBar) {
    // Listen for NavigationEnd events and call the fetchSubmissions method
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.url === '/author-dashboard') {
        this.fetchSubmissions();
      }
    });
  }
  authorName: string = '';
  ngOnInit(): void {
    
    console.log('ngOnInit called')
    const userId = parseInt(localStorage.getItem('userId'), 10);
    this.adminService.getAuthorInfo(userId).subscribe((data: any) => {
      this.authorName = data.firstName;
    });
    this.adminService.getAuthorSubmissions(userId).subscribe((data: any[]) => {
      console.log('Received submissions data:', data); // Log the received data
      this.submissions = data;
      
    
    
      // Log individual submission properties
      data.forEach((submission, index) => {
        console.log(`Submission ${index + 1}:`, submission);
      });
    
      // Log the second submission data
      console.log('Second submission data:', data[1]);
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
  
  modifySubmission(submissionId: number): void {
    this.router.navigate(['/modify-submission', submissionId]);
  }
  fetchSubmissions(): void {
    const userId = parseInt(localStorage.getItem('userId'), 10);
    this.adminService.getAuthorInfo(userId).subscribe((data: any) => {
      this.authorName = data.firstName;
    });
    this.adminService.getAuthorSubmissions(userId).subscribe((data: any[]) => {
      console.log('Received submissions data:', data); // Log the received data
      this.submissions = data;
  
      // Log individual submission properties
    
    });
  }

  
  
  
  onPaymentFileSelected(event: any, submissionId: number): void {
    const paymentFile = event.target.files[0];
  
    this.submitService.uploadPaymentFile(paymentFile, submissionId).subscribe(response => {
      console.log('Payment file uploaded successfully');
  
      // Show success snackbar
      this.snackBar.open('Payment uploaded successfully!', 'Close', {
        duration: 10000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-success', 'custom-snackbar', 'mat-snack-bar-container-center']
      });
  
    }, error => {
      console.log('Error uploading payment file:', error);
    
      // Show error snackbar
      this.snackBar.open('An error occurred while uploading the payment file. Please try again.', 'Close', {
        duration: 10000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-error', 'custom-snackbar', 'mat-snack-bar-container-center']
      });
    });
  }
}
 

