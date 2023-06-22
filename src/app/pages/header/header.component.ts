import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { PageServiceService } from 'src/app/services/page-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  content: any;
  public contentAffiche;
  public titreAffiche;
 

  // Define the variables
// Define the variables
logoURL: SafeUrl ;
backgroundURL: SafeUrl ;


  constructor(private pageServiceService: PageServiceService, private sanitizer: DomSanitizer) {}

  toolbarVariable: boolean = true;
  
  openToolbar() {
    this.toolbarVariable = !this.toolbarVariable;
  }
  
  ngOnInit(): void {
   
      this.pageServiceService.getImageByPurpose('logo');
      this.pageServiceService.getImageByPurpose('background');
    this.pageServiceService.logoURL.subscribe(url => {
      if (typeof url === 'string') {
        this.logoURL = this.sanitizer.bypassSecurityTrustUrl(url);
      } else {
        this.logoURL = url;
      }
    });
  
   this.pageServiceService.backgroundURL.subscribe(url => {
  if (typeof url === 'string') {
    this.backgroundURL = this.sanitizer.bypassSecurityTrustStyle('url(' + url + ')');
  } else {
    this.backgroundURL = url;
  }
});

  
    this.pageServiceService.getHeaderPage().subscribe((response: any) => {
      this.contentAffiche = this.sanitizer.bypassSecurityTrustHtml(response.contactMail);
    });
  
    this.pageServiceService.getTitle().subscribe((response: any) => {
      this.titreAffiche = this.sanitizer.bypassSecurityTrustHtml(response.title);
    });
    this.pageServiceService.logoURL.subscribe(url => this.logoURL = url);
  this.pageServiceService.backgroundURL.subscribe(url => this.backgroundURL = url);
  }
  

}
