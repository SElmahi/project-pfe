import { Component, OnInit } from '@angular/core';
import { AboutService } from 'src/app/services/about.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  content:any
  constructor(private aboutSerive:AboutService){

  }
  
  ngOnInit(): void {
   this.content = this.aboutSerive.getAboutPage()
  
  }

  local="fso Oujda"
  textAbout="text"
}
