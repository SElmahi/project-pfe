import { Component } from '@angular/core';
import { PageServiceService } from 'src/app/services/page-service.service';

@Component({
  selector: 'app-committees',
  templateUrl: './committees.component.html',
  styleUrls: ['./committees.component.css']
})
export class CommitteesComponent {
  public contentAffiche;
  
  content: any;

  constructor(private pageServiceService: PageServiceService) {}

 
  ngOnInit(): void {
    this.pageServiceService.getCommitteesPage().subscribe((response: any) => {
      this.contentAffiche = response.content;
      console.log(response);
    });
  }
}