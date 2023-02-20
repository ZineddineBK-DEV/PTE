import { SignupComponent } from './signup/signup.component';
import { MaterialModule } from './../Material/material.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminLayoutModule } from 'app/layouts/admin-layout/admin-layout.module';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LoginComponent } from './login/login.component';

import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    AdminLayoutModule,
    ReactiveFormsModule,
    
    
    
    
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    LoginComponent,
    SignupComponent,
    
    
    
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    SignupComponent
  ]
})
export class ComponentsModule { }
