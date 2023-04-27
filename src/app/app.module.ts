import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router'; // Import RouterModule here
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommitteesComponent } from './pages/committees/committees.component';
import { ImportantDatesComponent } from './pages/important-dates/important-dates.component';
import { CallForPapersComponent } from './pages/call-for-papers/call-for-papers.component';
import { RegisterComponent } from './pages/register/register.component';
import { PublicationIndexComponent } from './pages/publication-index/publication-index.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminGuard } from './guards/admin.guard'; // Import AdminGuard here
import { HeaderComponent } from './pages/header/header.component';
import { SubmitComponent } from './pages/submit/submit.component';
import { AdminDasboardComponent } from './pages/admin-dasboard/admin-dasboard.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { HttpClientModule } from '@angular/common/http';
import { AdminService } from './services/admin.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthorDashboardComponent } from './pages/author-dashboard/author-dashboard.component';
import { MatTableModule } from '@angular/material/table';
import { ModifySubmissionComponent } from './pages/modify-submission/modify-submission.component';
import { AddSubmissionComponent } from './pages/add-submission/add-submission.component';




const routes: Routes = [
  { path: 'admin-dashboard', component: AdminDasboardComponent, canActivate: [AdminGuard] },
  // ...
];

@NgModule({
  declarations: [
    AppComponent,
    CommitteesComponent,
    ImportantDatesComponent,
    CallForPapersComponent,
    RegisterComponent,
    PublicationIndexComponent,
    AdminComponent,
    HeaderComponent,
    SubmitComponent,
    AdminDasboardComponent,
    AuthorDashboardComponent,
    ModifySubmissionComponent,
    AddSubmissionComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CKEditorModule,
    BrowserAnimationsModule,
    FormsModule,
    MatSnackBarModule,
    HttpClientModule,
    MatTableModule,
    FormsModule,
   ReactiveFormsModule,

   
    RouterModule.forRoot(routes) // Add RouterModule here
  ],
  providers: [AdminService, AdminGuard], // Add AdminGuard to providers array
  bootstrap: [AppComponent],
  exports: [RouterModule],
  
})
export class AppModule { 
  
}
