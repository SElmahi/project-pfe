import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PageServiceService } from 'src/app/services/page-service.service';

@Component({
  selector: 'app-publication-index',
  templateUrl: './publication-index.component.html',
  styleUrls: ['./publication-index.component.css']
})
export class PublicationIndexComponent {
  public contentAffiche;
  
  content: any;

  constructor(
  private pageServiceService: PageServiceService,
  private sanitizer: DomSanitizer){} 

 
  ngOnInit(): void {
    this.pageServiceService
      .getPublicationIndexPage()
      .subscribe((response: any) => {
        this.contentAffiche = this.sanitizer.bypassSecurityTrustHtml(
          response.content
        );
      });
  }
}


