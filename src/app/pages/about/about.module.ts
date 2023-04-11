import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutService } from 'src/app/services/about.service';
import { AboutComponent } from './about.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CKEditorModule

    
  ],
  providers: [
    AboutService
  ],
  exports: [
    
  ],
})
export class AboutModule { }
