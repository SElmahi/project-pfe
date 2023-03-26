import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutService } from 'src/app/services/about.service';
import { AboutComponent } from './about.component';
import { CKEditorModule,CKEditorComponent } from '@ckeditor/ckeditor5-angular';






@NgModule({
  declarations: [AboutComponent],
  imports: [
    CommonModule,
    CKEditorModule,
    CKEditorComponent
    
  ],
  providers: [
    AboutService
  ],exports: [
    AboutComponent
  ],
})
export class AboutModule { }
