import { Component, OnInit } from '@angular/core';
import { AboutService } from 'src/app/services/about.service';
import { PageServiceService } from 'src/app/services/page-service.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  content: any;
  conferencePorgramme: any;
  conferenceVenue: any;
  partners :any
  constructor(private pageServiceService: PageServiceService) {}

  ngOnInit(): void {
    this.content = this.pageServiceService.getAboutPage();
    this.conferencePorgramme = this.pageServiceService.getConferenceProgramme();
    this.conferenceVenue = this.pageServiceService.getConferenceVenue();
    this.partners=this.pageServiceService.getPartners();
  }

  local = 'fso Oujda';
  textAbout = 'text';
}
