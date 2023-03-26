import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagescontrolComponent } from './pagescontrol.component';
import { AboutService } from 'src/app/services/about.service';


@NgModule({
  declarations: [
    PagescontrolComponent
  ],
  imports: [
    CommonModule,
  ],
  providers:[AboutService]
})
export class PagescontrolModule { }
