import { Component, OnInit } from '@angular/core';
import { PageServiceService } from 'src/app/services/page-service.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-important-dates',
  templateUrl: './important-dates.component.html',
  styleUrls: ['./important-dates.component.css'],
})
export class ImportantDatesComponent implements OnInit {
  public contentAffiche;

  content: any;

  constructor(
    private pageServiceService: PageServiceService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.pageServiceService
      .getImportantDatesPage()
      .subscribe((response: any) => {
        this.contentAffiche = this.sanitizer.bypassSecurityTrustHtml(
          response.content
        );
      });
  }
}