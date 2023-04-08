import { Component } from '@angular/core';
import { SubmitService } from '../../services/submit.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, Validators, FormGroup, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.css']
})
export class SubmitComponent {
  onFileSelected(event: any) {
    if (event && event.length > 0) {
      this.selectedFile = event[0];
      this.submitForm.updateValueAndValidity(); // Trigger form validation update
    }
  }
  submitForm: FormGroup;
  selectedFile: File;
  isSubmitting: boolean = false;

  constructor(private submitService: SubmitService, private snackBar: MatSnackBar, private formBuilder: FormBuilder) {
    this.submitForm = this.formBuilder.group({
      name: ['', Validators.required],
      familyName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    }, { validators: this.fileSelectedValidator.bind(this) });
    
  }
  
  fileSelectedValidator(control: AbstractControl): ValidationErrors | null {
    if (!this.selectedFile) {
      return { fileNotSelected: true };
    }
    return null;
  }
  onSubmit() {
   
    if (this.submitForm.invalid) {
      return;
    }
    const { name, familyName, email } = this.submitForm.value;
    this.isSubmitting = true;
    this.submitService.registerAttendee(name, familyName, email, this.selectedFile).subscribe(
      (response) => {
        console.log('Attendee registered successfully');
        this.isSubmitting = false;

        // Show success snackbar
        this.snackBar.open('Successfully submitted! Please check your email for confirmation.', 'Close', {
          duration: 15000, // 10 seconds
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['snackbar-success', 'custom-snackbar', 'mat-snack-bar-container-center'] // Add your custom classes here
        });
        // Redirect to the confirmation view or clear the form
      },
      (error) => {
        this.isSubmitting = false;
        let errorMessage = 'Failed to register attendee';
  
        if (error.status === 409) { // Email is already registered
          errorMessage = 'Email is already registered.';
        } else if (error.status === 413) { // File size limit exceeded
          errorMessage = 'File size must not exceed 5 MB.';
        } else if (error.status === 400) { // Invalid email format
          errorMessage = 'Invalid email format.';
        }
       else if (error.status === 500) { // Internal server error
        errorMessage = 'An unexpected error occurred on the server. Please try again later.';
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
