import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SubmitService } from '../../services/submit.service';
import { FormBuilder, Validators, FormGroup, AbstractControl, ValidationErrors } from '@angular/forms';
import { Author } from 'src/app/models/Author';
import { Observable } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-submission',
  templateUrl: './add-submission.component.html',
  styleUrls: ['./add-submission.component.css']
})
export class AddSubmissionComponent implements OnInit {
  addSubmissionForm: FormGroup;
  selectedFile: File;
  isSubmitting: boolean = false;
  submitForm: FormGroup;
  author: Author;

  constructor(private formBuilder: FormBuilder, private submitService: SubmitService, private adminService : AdminService, private snackBar: MatSnackBar, private router: Router) {
    this.addSubmissionForm = this.formBuilder.group({
      title: ['', Validators.required],
      abstractText: ['', Validators.required],
      keywords: ['', Validators.required],
      paper: ['', Validators.required],
      submissionType: ['', Validators.required],
    }, { validators: this.fileSelectedValidator.bind(this) });
  }

  ngOnInit(): void {
    const userId = parseInt(localStorage.getItem('userId'), 10);
    this.adminService.getAuthorInfo(userId).subscribe((data: Author) => {
      this.author = data;
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    this.addSubmissionForm.updateValueAndValidity(); // Trigger form validation update
  }

  fileSelectedValidator(control: AbstractControl): ValidationErrors | null {
    if (!this.selectedFile || this.selectedFile.type !== 'application/pdf') {
      return { invalidFileType: true };
    }

    // Check for the file size limit
    if (this.selectedFile.size > 5 * 1024 * 1024) { // 5MB in bytes
      return { maxSize: true };
    }

    return null;
  }

  onSubmit(): void {
    if (this.addSubmissionForm.invalid) {
      return;
    }
    this.isSubmitting = true;
    // Pass this.author.id as the third argument to the addSubmission method
    this.submitService.addSubmission(this.addSubmissionForm.value, this.selectedFile, this.author.id).subscribe(response => {
  
  
      console.log('New submission successful');
      
      this.isSubmitting = false;
      this.snackBar.open('Successfully submitted! Please check your email for confirmation.', 'Close', {
        duration: 1300, // 15 seconds
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-success', 'custom-snackbar', 'mat-snack-bar-container-center'] // Add your custom classes here
        
      });
      this.router.navigate(['/author-dashboard']);
    
     
  
      // Reset the form
      this.addSubmissionForm.reset();
    }, error => {
      this.isSubmitting = false;
      let errorMessage = 'An error occurred while submitting the paper. Please try again.';
      console.error('Error message:', errorMessage);
      console.error('Error details:', error);
  
      if (error.status) {
        switch (error.status) {
          case 413: // File size limit exceeded
            errorMessage = 'File size must not exceed 5 MB.';
            break;
          case 500: // Internal server error
            errorMessage = 'An unexpected error occurred on the server. Please try again later.';
            break;
        }
      }
  
      this.snackBar.open(errorMessage, 'Close', {
        duration: 10000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-error', 'custom-snackbar', 'mat-snack-bar-container-center']
      });
    });
  }
  

}
