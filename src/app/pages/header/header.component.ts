import { Component, OnInit } from '@angular/core';
import { PageServiceService } from 'src/app/services/page-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  content: any;
  public open;

  constructor(private pageServiceService: PageServiceService) {}
  ngOnInit(): void {
    this.pageServiceService.getHeaderPage().subscribe((response: any) => {
      this.content = response;
    });
    const toggleButton = document.getElementsByClassName('toggle-button')[0];
    const toolbarUl = document.getElementsByClassName('link')[0];

    toggleButton.addEventListener('click', () => {
      toolbarUl.classList.toggle('active');
    });
  }
}
