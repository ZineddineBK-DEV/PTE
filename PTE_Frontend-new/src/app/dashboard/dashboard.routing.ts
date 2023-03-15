

import { Routes } from '@angular/router';


import { UserProfileComponent } from 'app/user-profile/user-profile.component';
import { TableListComponent } from 'app/user-management/user-management';
import { SignUpRequestsComponent } from 'app/components/sign-up-requests/sign-up-requests.component';
import { AuthGuard } from 'app/auth.guard';
import { RoleGuard } from 'app/role.guard';
import { VehiclesComponent } from 'app/components/vehicles/vehicles.component';
import { VehicleseventsComponent } from 'app/components/vehiclesevents/vehiclesevents.component';




export const dashboardRoutes: Routes = [
   
    
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'user-management',     component: TableListComponent },
    { path: 'requests',
    canActivate:[AuthGuard,RoleGuard] ,
    component: SignUpRequestsComponent,
    data :{
        role: 'admin',
    }},
    { path: 'vehicles',   component: VehiclesComponent },
    {path : 'vehiclesevents', component:VehicleseventsComponent},
    
]
  
