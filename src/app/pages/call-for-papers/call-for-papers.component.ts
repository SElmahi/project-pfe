import { Component } from '@angular/core';
import { PageServiceService } from 'src/app/services/page-service.service';

@Component({
  selector: 'app-call-for-papers',
  templateUrl: './call-for-papers.component.html',
  styleUrls: ['./call-for-papers.component.css']
})
export class CallForPapersComponent {

  content:any
  constructor(private pageServiceService:PageServiceService){

  }
  
  ngOnInit(): void {
    this.content = this.pageServiceService.getCallForPapersPage()
   
  }
}
