import { Component } from '@angular/core';
import { SubmitService } from '../../services/submit.service';

@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.css']
})
export class SubmitComponent {
  name: string;
  familyName: string;
  email: string;

  constructor(private submitService: SubmitService) { }

  onSubmit() {
    this.submitService.registerAttendee(this.name, this.familyName, this.email).subscribe(
      (response) => {
        console.log('Attendee registered successfully');
        // Redirect to the confirmation view
      },
      (error) => {
        console.error('Failed to register attendee', error);
        // Display an error message
      }
    );
  }
}
