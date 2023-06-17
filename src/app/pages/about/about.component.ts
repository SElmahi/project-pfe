import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
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
  sponsor1URL: SafeUrl | string = 'assets/image/logo1.jpg';
sponsor2URL: SafeUrl | string = 'assets/image/logo2.png';
sponsor3URL: SafeUrl | string = 'assets/image/logo3.jpg';
sponsor4URL: SafeUrl | string = 'assets/image/logo4.jpg';
venueImageURL: SafeUrl | string = 'assets/image/venue.jpg';

  constructor(
    private pageServiceService: PageServiceService,
    private sanitizer: DomSanitizer
  ) {}
//
  ngOnInit(): void {
    this.pageServiceService.getImageByPurpose('sponsor1');
    this.pageServiceService.getImageByPurpose('sponsor2');
    this.pageServiceService.getImageByPurpose('sponsor3');
    this.pageServiceService.getImageByPurpose('sponsor4');
    this.pageServiceService.getImageByPurpose('venue');
    // Subscribe to the sponsor image URLs
    this.pageServiceService.sponsor1URL.subscribe(url => this.sponsor1URL = url);
    this.pageServiceService.sponsor2URL.subscribe(url => this.sponsor2URL = url);
    this.pageServiceService.sponsor3URL.subscribe(url => this.sponsor3URL = url);
    this.pageServiceService.sponsor4URL.subscribe(url => this.sponsor4URL = url);
    this.pageServiceService.venueImageURL.subscribe(url => this.venueImageURL = url);
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