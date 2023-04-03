import { Component } from '@angular/core';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { PageServiceService } from 'src/app/services/page-service.service';

@Component({
  selector: 'app-admin-dasboard',
  templateUrl: './admin-dasboard.component.html',
  styleUrls: ['./admin-dasboard.component.css'],
})
export class AdminDasboardComponent {
  
  public pages = [
    'About',
    'Header',
    'Register',
    'Committees',
    'Call For Papers',
    'Important Dates',
    'Publication Index',
  ];
  public Editor = ClassicEditor as any;
  public pageSelected!: string;
  private editordata
  constructor(private pageServiceService:PageServiceService){}

  save() {
    if (this.pageSelected == 'About') {
   
   this.pageServiceService.saveAboutPage(this.editordata)
     
     
    } else if (this.pageSelected == 'Header') {
      this.pageServiceService.saveHeaderPage(this.editordata)

    } else if (this.pageSelected == 'Register') {
      this.pageServiceService.saveRegisterPage(this.editordata)

    } else if (this.pageSelected == 'Committees') {
      this.pageServiceService.saveCommitteesPage(this.editordata)

    } else if (this.pageSelected == 'Call For Papers') {
      this.pageServiceService.saveCallForPapersPage(this.editordata)

    } else if (this.pageSelected == 'Important Dates') {
      this.pageServiceService.saveImportantDatesPage(this.editordata)

    } else if (this.pageSelected == 'Publication Index') {
      this.pageServiceService.savePublicationIndexPage(this.editordata)

    } else {
    }
  }
  public onChange( { editor }: ChangeEvent ) {
    this.editordata = editor.getData();

}
}
