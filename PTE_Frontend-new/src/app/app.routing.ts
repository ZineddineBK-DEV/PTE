import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { TableListComponent } from './user-management/user-management';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { RoomsComponent } from './rooms/rooms.component';
import { CalendarComponent } from './calendar/calendar.component';

const routes: Routes =[

  { path: 'dashboard',      component: DashboardComponent },
  { path: 'user-management',     component: TableListComponent },
  { path :'user-profile/:id', component:UserProfileComponent},
  { path :'conference-rooms', component:RoomsComponent},
  { path :'calendar', component:CalendarComponent},

  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
