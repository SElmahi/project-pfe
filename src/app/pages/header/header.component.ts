import { Component, OnInit } from '@angular/core';
import { PageServiceService } from 'src/app/services/page-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  content: any;

  constructor(private pageServiceService: PageServiceService) {}
  toolbarVariable: boolean = true;
  openToolbar() {
    this.toolbarVariable = !this.toolbarVariable;
  }
  ngOnInit(): void {
    this.pageServiceService.getHeaderPage().subscribe((response: any) => {
      this.content = response;
    });
  }
}