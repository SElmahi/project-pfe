import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { AdminComponent } from './admin/admin.component';
import { CallForPapersComponent } from './call-for-papers/call-for-papers.component';
import { CommitteesComponent } from './committees/committees.component';
import { ImportantDatesComponent } from './important-dates/important-dates.component';
import { PublicationIndexComponent } from './publication-index/publication-index.component';
import { RegisterComponent } from './register/register.component';
import { SubmitComponent } from './submit/submit.component';

const routes: Routes = [
  { path: 'about' , component:AboutComponent },
  { path: 'committees', component:CommitteesComponent},
  { path: 'call-for-papers' , component:CallForPapersComponent},
  { path:'important-dates' , component:ImportantDatesComponent},
  { path: 'publication-index' , component:PublicationIndexComponent},
  { path: 'register' , component:RegisterComponent},
  { path: 'submit' , component:SubmitComponent},
  { path: 'admin' , component:AdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
