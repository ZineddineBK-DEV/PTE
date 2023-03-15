import { SignupComponent } from './signup/signup.component';
import { MaterialModule } from './../Material/material.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginComponent } from './login/login.component';
import { UserProfileComponent } from 'app/user-profile/user-profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SignUpRequestsComponent } from './sign-up-requests/sign-up-requests.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { AddcarComponent } from './vehicles/addcar/addcar.component';
import { VehicleseventsComponent } from './vehiclesevents/vehiclesevents.component';
import { VerificationcodeComponent } from './verificationcode/verificationcode.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    
    
    
    
    
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    LoginComponent,
    SignupComponent,
    UserProfileComponent,
    SignUpRequestsComponent,
    VehiclesComponent,
    AddcarComponent,
    VehicleseventsComponent,
    VerificationcodeComponent,
    ChangepasswordComponent,
    
    
    
    
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    SignupComponent,
    UserProfileComponent,
    SignUpRequestsComponent,
    VehiclesComponent
  ]
})
export class ComponentsModule { }
