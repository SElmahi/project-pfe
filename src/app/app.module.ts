import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './pages/about/about.component';
import { CommitteesComponent } from './pages/committees/committees.component';
import { ImportantDatesComponent } from './pages/important-dates/important-dates.component';
import { CallForPapersComponent } from './pages/call-for-papers/call-for-papers.component';
import { RegisterComponent } from './pages/register/register.component';
import { PublicationIndexComponent } from './pages/publication-index/publication-index.component';
import { AdminComponent } from './pages/admin/admin.component';
import { HeaderComponent } from './pages/header/header.component';
import { SubmitComponent } from './pages/submit/submit.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AboutService } from './services/about.service';



@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    CommitteesComponent,
    ImportantDatesComponent,
    CallForPapersComponent,
    RegisterComponent,
    PublicationIndexComponent,
    AdminComponent,
    HeaderComponent,
    SubmitComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CKEditorModule
  ],
  providers: [AboutService],
  bootstrap: [AppComponent]
})
export class AppModule { }
