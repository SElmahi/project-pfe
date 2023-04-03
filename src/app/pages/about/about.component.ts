import { Component, OnInit } from '@angular/core';
import { AboutService } from 'src/app/services/about.service';
import { PageServiceService } from 'src/app/services/page-service.service';


@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  content:any
  constructor(private pageServiceService:PageServiceService){

  }
  
  ngOnInit(): void {
    this.content = this.pageServiceService.getAboutPage()
   
  }

  local="fso Oujda"
  textAbout="text"
}
