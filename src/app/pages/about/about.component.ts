import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AboutService } from 'src/app/services/about.service';
import { PageServiceService } from 'src/app/services/page-service.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  contentAffiche: any;
  conferencePorgramme: any;
  conferenceVenue: any;
  partners: any;

  constructor(
    private pageServiceService: PageServiceService,
    private sanitizer: DomSanitizer
  ) {}
//
  ngOnInit(): void {
    this.pageServiceService.getAboutPage().subscribe((response: any) => {
      console.log('API Response:', response);
      this.contentAffiche = this.sanitizer.bypassSecurityTrustHtml(
        response.aboutContent
      );

      this.conferencePorgramme = this.sanitizer.bypassSecurityTrustHtml(
        response.conferenceProgramme
      );

      this.conferenceVenue = this.sanitizer.bypassSecurityTrustHtml(
        response.conferenceVenue
      );
    });
    this.partners = this.pageServiceService.getPartners();
  }
  local = 'fso Oujda';
  textAbout = 'text';
}