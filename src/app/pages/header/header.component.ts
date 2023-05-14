import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PageServiceService } from 'src/app/services/page-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  content: any;
  public contentAffiche;
  constructor(private pageServiceService: PageServiceService, private sanitizer: DomSanitizer) {}
  toolbarVariable: boolean = true;
  openToolbar() {
    this.toolbarVariable = !this.toolbarVariable;
  }
  ngOnInit(): void {
    this.pageServiceService.getHeaderPage().subscribe((response: any) => {
      this.contentAffiche = this.sanitizer.bypassSecurityTrustHtml(response.contactMail);
    });
  }
  
}