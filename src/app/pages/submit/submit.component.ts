
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SubmitService } from '../../services/submit.service';
import { Author, UserRole } from '../../models/Author';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, AbstractControl, ValidationErrors, FormArray } from '@angular/forms';
@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.css']
})
export class SubmitComponent implements OnInit {
  submitForm: FormGroup;
  selectedFile: File;
  isSubmitting: boolean = false;
  coAuthors: Author[] = [];

  constructor(private formBuilder: FormBuilder, private submitService: SubmitService, private snackBar: MatSnackBar, private router: Router) {
    this.submitForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required, this.confirmPasswordValidator.bind(this)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      affiliation: ['', Validators.required],
      title: ['', Validators.required],
      abstractText: ['', Validators.required],
      keywords: ['', Validators.required],
      paper: ['', Validators.required],
      submissionType: ['', Validators.required],
       coAuthors: this.formBuilder.array([]),
    }, { validators: this.fileSelectedValidator.bind(this) });
  }

  ngOnInit(): void {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    this.submitForm.updateValueAndValidity(); // Trigger form validation update
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
    if (this.submitForm.invalid) {
      return;
    }
  
    this.isSubmitting = true;
    this.submitService.submitPaper(this.submitForm.value, this.selectedFile, this.coAuthors).subscribe(response => {
     
      console.log('Submission successful');
      this.isSubmitting = false;

      // Show success snackbar
      this.snackBar.open('Successfully  Submitted! Please check your email for confirmation.', 'Close', {
        duration: 15000, // 10 seconds
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['snackbar-success', 'custom-snackbar', 'mat-snack-bar-container-center'] // Add your custom classes here
      });
      // Redirect to the confirmation view or clear the form
      this.submitForm.reset();
      this.coAuthors = [];
    }, error => {
      this.isSubmitting = false;
      let errorMessage = 'An error occurred while submitting the paper. Please try again.';
  
      if (error.status) {
        switch (error.status) {
          case 409: // Email is already registered
            errorMessage = 'Email is already registered.';
            break;
          case 413: // File size limit exceeded
            errorMessage = 'File size must not exceed 5 MB.';
            break;
          case 400: // Invalid email format
            errorMessage = 'Invalid email format.';
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
  

  addCoAuthor(): void {
    const coAuthorsArray = this.submitForm.get('coAuthors') as FormArray;
    coAuthorsArray.push(this.formBuilder.group({
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      affiliation: ['', Validators.required],
      role: [UserRole.AUTHOR]
    }));
  }

  removeCoAuthor(index: number): void {
    const coAuthorsArray = this.submitForm.get('coAuthors') as FormArray;
    coAuthorsArray.removeAt(index);
  }


confirmPasswordValidator(control: AbstractControl) {
  if (control && (control.value !== null || control.value !== undefined)) {
    const confirmPassword = control.value;

    const passwordControl = control.root.get('password');
    if (passwordControl) {
      const password = passwordControl.value;
      if (confirmPassword !== password) {
        return {
          isError: true,
        };
      }
    }
  }
  return null;
}
getCoAuthorsControls(): AbstractControl[] {
  return (this.submitForm.get('coAuthors') as FormArray).controls;
}
}
