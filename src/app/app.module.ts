import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './pages/about/about.component';
import { CommitteesComponent } from './committees/committees.component';
import { ImportantDatesComponent } from './important-dates/important-dates.component';
import { CallForPapersComponent } from './call-for-papers/call-for-papers.component';
import { RegisterComponent } from './register/register.component';
import { PublicationIndexComponent } from './publication-index/publication-index.component';
import { AdminComponent } from './admin/admin.component';
import { HeaderComponent } from './header/header.component';
import { SubmitComponent } from './submit/submit.component';


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
    SubmitComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
