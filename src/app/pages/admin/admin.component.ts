import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  constructor(private adminService: AdminService, private router: Router) {}

  onLogin(form: NgForm): void {
    if (form.invalid) {
      return;
    }
  
    this.adminService.login(form.value.email, form.value.password).subscribe(
      (response: any) => {
        console.log(response);
        if (response.role === 'Admin') {
          this.adminService.saveUserDetails(response.role, form.value.email);
          this.router.navigate(['/admin-dashboard']);
        } else if (response.role === 'Author') {
          this.adminService.saveUserDetails(response.role, form.value.email);
          this.router.navigate(['/author-dashboard']);
        }
      },
      (error) => {
        console.error('Failed to login', error);
      }
    );
  
  }
}
