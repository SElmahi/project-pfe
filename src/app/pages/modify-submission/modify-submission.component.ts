import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SubmitService } from '../../services/submit.service';
import { Author, UserRole } from '../../models/Author';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  Validators,
  FormGroup,
  AbstractControl,
  ValidationErrors,
  FormArray,
} from '@angular/forms';
import { Submission } from 'src/app/models/Submission';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-modify-submission',
  templateUrl: './modify-submission.component.html',
  styleUrls: ['./modify-submission.component.css'],
})
export class ModifySubmissionComponent implements OnInit {
  submitForm: FormGroup;
  selectedFile: File;
  isSubmitting: boolean = false;
  coAuthors: Author[] = [];
  submissionId: string;
  submission: Submission;
  loading = false;
  error: string;

  constructor(
    private formBuilder: FormBuilder,
    private submitService: SubmitService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.submitForm = this.formBuilder.group(
      {
        title: ['', Validators.required], // Add this line
        abstractText: ['', Validators.required],
        keywords: ['', Validators.required],
        paper: ['', Validators.required],
        submissionType: ['', Validators.required],
        coAuthors: this.formBuilder.array([]),
      },
      { validators: this.fileSelectedValidator.bind(this) }
    );
  }

  ngOnInit(): void {
    this.submissionId = this.route.snapshot.paramMap.get('id');
    this.getSubmissionData(this.submissionId);
  }

  getSubmissionData(id: string): void {
    this.submitService
      .getSubmissionById(id)
      .subscribe((submission: Submission) => {
        this.submission = submission;
        const { paper, ...submissionData } = submission;
        this.submitForm.patchValue(submissionData);
        console.log('Submission data:', submissionData);
      });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    this.submitForm.updateValueAndValidity(); // Trigger form validation update
  }

  fileSelectedValidator(control: AbstractControl): ValidationErrors | null {
    if (!this.selectedFile || this.selectedFile.type !== 'application/pdf') {
      return { invalidFileType: true };
    }

    // Check for the file size limit
    if (this.selectedFile.size > 5 * 1024 * 1024) {
      // 5MB in bytes
      return { maxSize: true };
    }

    return null;
  }
  modifySubmission(): void {
    if (this.submitForm.invalid) {
      return;
    }
    const formData = {
      ...this.submitForm.value,
      customId: this.submission.customId,
    };
    console.log('Form  modifed dd data:', formData); // Add this line
    this.updateSubmission(formData, this.selectedFile);
  }

  updateSubmission(formData: any, paper: File): void {
    this.loading = true;
    this.error = null;

    // Update the submission object with the form values and the selected file
    const updatedSubmission = { ...this.submission, ...formData };
    if (paper) {
      updatedSubmission.paper = paper;
    }

    // Remove the 'paper' property when sending the request

    this.submitService
      .updateSubmission(
        this.submission.id,
        updatedSubmission,
        this.selectedFile
      )
      .subscribe(
        () => {
          this.loading = false;
          this.router.navigate(['/author-dashboard']); // Navigate to a success page or the updated submission page
        },
        (error) => {
          this.loading = false;
          this.error = 'Failed to update the submission. Please try again.';
        }
      );
  }

  getCoAuthorsControls(): AbstractControl[] {
    return (this.submitForm.get('coAuthors') as FormArray).controls;
  }
}
