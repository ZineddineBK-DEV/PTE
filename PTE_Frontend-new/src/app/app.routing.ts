
import { LoginComponent } from './components/login/login.component';
import { NgModule, Component } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { AuthGuard } from './auth.guard';
import { VerificationcodeComponent } from './components/verificationcode/verificationcode.component';
import { ChangepasswordComponent } from './components/changepassword/changepassword.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { TableListComponent } from './user-management/user-management';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RoomsComponent } from './rooms/rooms.component';
import { CalendarComponent } from './calendar/calendar.component';

const routes: Routes = [

  { path: 'dashboard', component: DashboardComponent },
  { path: 'user-management', component: TableListComponent },
  { path: 'user-profile/:id', component: UserProfileComponent },
  { path: 'conference-rooms', component: RoomsComponent },
  { path: 'calendar', component: CalendarComponent },

  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', canActivate: [AuthGuard], component: DashboardComponent },
  { path: 'verificationcode', component: VerificationcodeComponent },
  { path: 'changepassword', component: ChangepasswordComponent },

  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },

  {
    path: '',
    canActivate: [AuthGuard],
    component: DashboardComponent,
    children: [{
      path: '',
      loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    }]
  }

];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
