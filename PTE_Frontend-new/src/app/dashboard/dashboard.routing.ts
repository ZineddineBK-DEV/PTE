import { CalendarComponent } from './../components/calendar/calendar.component';
import { Component } from '@angular/core';

import { Routes } from '@angular/router';


import { UserProfileComponent } from 'app/user-profile/user-profile.component';
import { TableListComponent } from 'app/user-management/user-management';
import { SignUpRequestsComponent } from 'app/components/sign-up-requests/sign-up-requests.component';
import { AuthGuard } from 'app/auth.guard';
import { RoleGuard } from 'app/role.guard';
import { VehiclesComponent } from 'app/components/vehicles/vehicles.component';
import { VehicleseventsComponent } from 'app/components/vehicles/vehiclesevents/vehiclesevents.component';




export const dashboardRoutes: Routes = [
   
    
    { path: 'user-profile',canActivate:[AuthGuard],   component: UserProfileComponent },
    { path: 'user-management', canActivate:[AuthGuard],    component: TableListComponent },
    { path: 'requests',
    canActivate:[AuthGuard,RoleGuard] ,
    component: SignUpRequestsComponent
    },
    { path: 'vehicles', canActivate:[AuthGuard,RoleGuard],  component: VehiclesComponent ,
      },
    {path : 'vehiclesevents',canActivate:[AuthGuard], component:VehicleseventsComponent},
    {path : 'calendar',canActivate:[AuthGuard], component:CalendarComponent}
    
    
   
    
]
  
