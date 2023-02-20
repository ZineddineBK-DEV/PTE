import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../user-management/user-management';
import { LoginComponent } from 'app/components/login/login.component';
import { SignupComponent } from 'app/components/signup/signup.component';


export const AdminLayoutRoutes: Routes = [
   
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'user-management',     component: TableListComponent },
    
    


];
