import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { AdminDasboardComponent } from './pages/admin-dasboard/admin-dasboard.component';
import { AdminComponent } from './pages/admin/admin.component';
import { CallForPapersComponent } from './pages/call-for-papers/call-for-papers.component';
import { CommitteesComponent } from './pages/committees/committees.component';
import { ImportantDatesComponent } from './pages/important-dates/important-dates.component';
import { PublicationIndexComponent } from './pages/publication-index/publication-index.component';
import { RegisterComponent } from './pages/register/register.component';
import { SubmitComponent } from './pages/submit/submit.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthorDashboardComponent } from './pages/author-dashboard/author-dashboard.component';
const routes: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'committees', component: CommitteesComponent },
  { path: 'call-for-papers', component: CallForPapersComponent },
  { path: 'important-dates', component: ImportantDatesComponent },
  { path: 'publication-index', component: PublicationIndexComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'submit', component: SubmitComponent },
  { path: 'admin-dashboard', component: AdminDasboardComponent, canActivate: [AdminGuard] },
  { path: 'admin', component: AdminComponent },
  {
    path: 'author-dashboard',component: AuthorDashboardComponent,canActivate: [AdminGuard], // Use the updated AdminGuard to protect the route
  },
  { path: '', component: AboutComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
