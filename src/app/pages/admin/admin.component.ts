import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  username: string;
  password: string;
  constructor(private adminService: AdminService, private router: Router) {}

  onLogin(): void {
    this.adminService
      .login(this.username, this.password)
      .subscribe((response) => this.gotoDashboard(response));
  }
  gotoDashboard(response) {
    console.log(response);
    if (response.role === 'Admin') {
    } else if (response.role === 'Author') {
      this.router.navigate(['/admin-dashboard']);
    }

    this.router.navigate(['/admin-dashboard']);
  }
}
