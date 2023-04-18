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
  displayedColumns: string[] = ['title', 'abstractText', 'keywords', 'submissionState', 'submissionDate'];

  constructor(private adminService: AdminService,private router :Router) {}
  authorName: string = '';
  ngOnInit(): void {
    console.log('ngOnInit called')
    const userId = parseInt(localStorage.getItem('userId'), 10);
    this.adminService.getAuthorInfo(userId).subscribe((data: any) => {
      this.authorName = data.firstName;
    });
    
    this.adminService.getAuthorSubmissions(userId).subscribe((data: any[]) => {
      console.log('Updated submissions data:', data); // Check the updated data
      this.submissions = data;
    });

  }
  getPaperUrl(subfolder: string, fileName: string): string {
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