import { Component } from '@angular/core';
import { PageServiceService } from 'src/app/services/page-service.service';

@Component({
  selector: 'app-publication-index',
  templateUrl: './publication-index.component.html',
  styleUrls: ['./publication-index.component.css']
})
export class PublicationIndexComponent {
content :any
constructor( private pageServiceService:PageServiceService){}

ngOnInit(): void {
  this.content = this.pageServiceService.getPublicationIndexPage()
 
}

}
