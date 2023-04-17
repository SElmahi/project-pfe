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
    const userId = parseInt(localStorage.getItem('userId'), 10);
    this.adminService.getAuthorInfo(userId).subscribe((data: any) => {
      this.authorName = data.firstName;
    });
    
    this.adminService.getAuthorSubmissions(userId).subscribe((data: any[]) => {
      this.submissions = data;
    });

  }
  getPaperUrl(paperName: string): string {
    return `http://localhost:8080/api/submissions/papers/${paperName}`;
  }
  modifySubmission(submissionId: number): void {
    this.router.navigate(['/modify-submission', submissionId]);
  }

}