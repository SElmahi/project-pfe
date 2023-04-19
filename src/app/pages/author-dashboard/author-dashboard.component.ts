import { Component, OnInit } from '@angular/core';
import { AdminService } from './../../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-author-dashboard',
  templateUrl: './author-dashboard.component.html',
  styleUrls: ['./author-dashboard.component.css']
})
export class AuthorDashboardComponent implements OnInit {
  submissions: any[] = [];
  displayedColumns: string[] = ['title', 'abstractText', 'keywords', 'submissionState', 'submissionDate', 'submissionType'];


  constructor(private adminService: AdminService,private router :Router) {}
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

}