import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  constructor(private adminService: AdminService, private router: Router, private snackBar: MatSnackBar) {}

  onLogin(form: NgForm): void {
    if (form.invalid) {
      return;
    }
    const emailPattern = /^(admin|[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,})$/;
    if (!emailPattern.test(form.value.email)) {
      // Show error snackbar
      this.snackBar.open('Please enter a valid email', 'Close', {
        duration: 10000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-error', 'custom-snackbar', 'mat-snack-bar-container-center'] 
      });
      return;
    }
    
    this.adminService.login(form.value.email, form.value.password).subscribe(
      (response: any) => {
        console.log(response);
        if (response.role === 'Admin') {
          this.adminService.saveUserDetails(response.role, form.value.email,response.id);
          this.router.navigate(['/admin-dashboard']);
        } else if (response.role === 'Author') {
          this.adminService.saveUserDetails(response.role, form.value.email,response.id);
          this.router.navigate(['/author-dashboard']);
        }
      },
      (error) => {
        console.error('Failed to login', error);
        let errorMessage = 'Failed to login';
    
        // Add specific error handling as required
        
        if (error.status === 401) { // Unauthorized
          errorMessage = 'Invalid password or email.';
        } else if (error.status === 404) { // Email not found
          errorMessage = 'Invalid password or email.';
        } else if (error.status === 500) { // Internal server error
          errorMessage = 'An unexpected error occurred. Please try again later.';
        }
       
        else {
          errorMessage = 'An error occurred. Please try again later.';
        }
    
        // Show error snackbar
        this.snackBar.open(errorMessage, 'Close', {
          duration: 10000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snackbar-error', 'custom-snackbar', 'mat-snack-bar-container-center'] 
        });
      }
    );
    
  
  }
}
