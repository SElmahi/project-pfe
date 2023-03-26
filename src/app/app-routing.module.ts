import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { AdminComponent } from './pages/admin/admin.component';
import { CallForPapersComponent } from './pages/call-for-papers/call-for-papers.component';
import { CommitteesComponent } from './pages/committees/committees.component';
import { ImportantDatesComponent } from './pages/important-dates/important-dates.component';
import { PagescontrolComponent } from './pages/pagescontrol/pagescontrol.component';
import { PublicationIndexComponent } from './pages/publication-index/publication-index.component';
import { RegisterComponent } from './pages/register/register.component';
import { SubmitComponent } from './pages/submit/submit.component';

const routes: Routes = [
  { path: 'about' , component:AboutComponent },
  { path: 'committees', component:CommitteesComponent},
  { path: 'call-for-papers' , component:CallForPapersComponent},
  { path:'important-dates' , component:ImportantDatesComponent},
  { path: 'publication-index' , component:PublicationIndexComponent},
  { path: 'register' , component:RegisterComponent},
  { path: 'submit' , component:SubmitComponent},
  { path: 'admin' , component:AdminComponent},
  { path: 'pagescontrol', component:PagescontrolComponent},
  { path: '' , component:AboutComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }