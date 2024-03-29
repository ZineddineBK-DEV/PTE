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
import { ReactiveFormsModule } from '@angular/forms';
import { SignUpRequestsComponent } from './sign-up-requests/sign-up-requests.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { AddcarComponent } from './vehicles/addcar/addcar.component';
import { VerificationcodeComponent } from './verificationcode/verificationcode.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { VehicleseventsComponent } from './vehicles/vehiclesevents/vehiclesevents.component';
import { CalendarComponent } from './calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { EventformComponent } from './vehicles/eventform/eventform.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { EditVehicleComponent } from './vehicles/edit-vehicle/edit-vehicle.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatFormFieldModule,
    MatTableModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,
    MatDialogModule,

  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    LoginComponent,
    SignupComponent,
    SignUpRequestsComponent,
    VehiclesComponent,
    AddcarComponent,
    VerificationcodeComponent,
    ChangepasswordComponent,
    VehicleseventsComponent,
    CalendarComponent,
    EventformComponent,
    ConfirmationDialogComponent,
    ErrorDialogComponent,
    EditVehicleComponent,
    
  ],
  exports: []
})
export class ComponentsModule { }
