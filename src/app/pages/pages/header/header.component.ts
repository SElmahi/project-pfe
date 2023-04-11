import { Component } from '@angular/core';
import { PageServiceService } from 'src/app/services/page-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  content: any;

  constructor(private pageServiceService: PageServiceService) {}
  ngOnInit(): void {
    this.content = this.pageServiceService.getHeaderPage();
  }
}
