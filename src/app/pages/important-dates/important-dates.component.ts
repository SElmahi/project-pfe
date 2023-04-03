import { Component } from '@angular/core';
import { PageServiceService } from 'src/app/services/page-service.service';

@Component({
  selector: 'app-important-dates',
  templateUrl: './important-dates.component.html',
  styleUrls: ['./important-dates.component.css']
})
export class ImportantDatesComponent {
content : any
constructor(private pageServiceService:PageServiceService){}
ngOnInit(): void {
  this.content = this.pageServiceService.getImportantDatesPage()
 
}

}
