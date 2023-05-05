import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PageServiceService } from 'src/app/services/page-service.service';

@Component({
  selector: 'app-call-for-papers',
  templateUrl: './call-for-papers.component.html',
  styleUrls: ['./call-for-papers.component.css']
})
export class CallForPapersComponent {

  public contentAffiche;
  
  content: any;

  constructor(
  private pageServiceService: PageServiceService,
  private sanitizer: DomSanitizer){} 

 
  ngOnInit(): void {
    this.pageServiceService
      .getCallForPapersPage()
      .subscribe((response: any) => {
        this.contentAffiche = this.sanitizer.bypassSecurityTrustHtml(
          response.content
        );
      });
  }
}
