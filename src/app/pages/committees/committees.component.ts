import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PageServiceService } from 'src/app/services/page-service.service';

@Component({
  selector: 'app-committees',
  templateUrl: './committees.component.html',
  styleUrls: ['./committees.component.css']
})
export class CommitteesComponent {
  public contentAffiche;
  
  content: any;

  constructor(
  private pageServiceService: PageServiceService,
  private sanitizer: DomSanitizer){} 

 
  ngOnInit(): void {
    this.pageServiceService
      .getCommitteesPage()
      .subscribe((response: any) => {
        this.contentAffiche = this.sanitizer.bypassSecurityTrustHtml(
          response.content
        );
      });
  }
}