import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SchoolCreateComponent } from './school-create/school-create.component';
import { SchoolDetailsComponent } from './school-details/school-details.component';
import { GuardService } from './services/guard.service';

const routes: Routes = [
{ path: '', component: HomeComponent },
{ path: 'dashboard', component: DashboardComponent, canActivate: [GuardService] },
{ path: 'school-create', component: SchoolCreateComponent, canActivate: [GuardService] },
{ path: 'school-details', component: SchoolDetailsComponent, canActivate: [GuardService] },
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
