import { Component } from '@angular/core';
import { PageServiceService } from 'src/app/services/page-service.service';

@Component({
  selector: 'app-committees',
  templateUrl: './committees.component.html',
  styleUrls: ['./committees.component.css']
})
export class CommitteesComponent {
content :any
constructor( private pageServiceService:PageServiceService){}
ngOnInit(): void {
  this.content = this.pageServiceService.getCommitteesPage()
 
}

}
