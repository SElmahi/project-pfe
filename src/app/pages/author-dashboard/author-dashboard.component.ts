import { Component, OnInit } from '@angular/core';
import { AdminService } from './../../services/admin.service';

@Component({
  selector: 'app-author-dashboard',
  templateUrl: './author-dashboard.component.html',
  styleUrls: ['./author-dashboard.component.css']
})
export class AuthorDashboardComponent implements OnInit {
  submissions: any[] = [];
  displayedColumns: string[] = ['title', 'abstractText', 'keywords', 'submissionState', 'submissionDate'];

  constructor(private adminService: AdminService) {}
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
}