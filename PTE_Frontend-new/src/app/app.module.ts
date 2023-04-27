import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs'
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { TableListComponent } from './user-management/user-management';
import { UserProfileComponent } from './user-profile/user-profile.component';
import {MatListModule} from '@angular/material/list';
import {AngularPaginatorModule} from 'angular-paginator'
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatRippleModule} from '@angular/material/core';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatRadioModule } from '@angular/material/radio';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { ExperienceFormComponent } from './user-profile/experience-form/experience-form.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ProjectFormComponent } from './user-profile/project-form/project-form.component';
import { ProfileImageComponent } from './user-profile/profile-image/profile-image.component';
import { EducationFormComponent } from './user-profile/education-form/education-form.component';
import { CertificationFormComponent } from './user-profile/certification-form/certification-form.component';
import { FileUploadModule } from 'ng2-file-upload';
import { EditRoleComponent } from './user-management/edit-role/edit-role.component';
import { NgxPrintModule } from 'ngx-print';
import { EditProfileComponent } from './user-profile/edit-profile/edit-profile.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { RoomsComponent } from './rooms/rooms.component';
import { CalendarComponent } from './calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { AddRoomComponent } from './rooms/add-room/add-room.component';
import { RoomEventsComponent } from './rooms/room-events/room-events.component';

import { MatDatepickerModule } from '@matheo/datepicker';
import { MatNativeDateModule } from '@matheo/datepicker/core';
import {NgxMatTimepickerModule} from 'ngx-mat-timepicker'; 
import { NgxMatDatetimePickerModule } from '@angular-material-components/datetime-picker';
import { MatDatetimepickerModule } from '@mat-datetimepicker/core';
import { MatMomentDatetimeModule } from '@mat-datetimepicker/moment';

import { DateTimePickerModule } from "@syncfusion/ej2-angular-calendars";
import { EventDtailsComponent } from './rooms/event-details/event-dtails.component';

@NgModule({
  imports: [
    DateTimePickerModule,
    
    DateInputsModule,
    MatMomentDatetimeModule,
    MatDatetimepickerModule,
    NgxMatDatetimePickerModule,
    MatDatepickerModule ,
    NgxMatTimepickerModule,
    MatNativeDateModule,
    FullCalendarModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    ComponentsModule,
    
    MatTableModule,
    MatSortModule,
    MatListModule,
    MatPaginatorModule,
    MatIconModule,
    MatDialogModule,MatSnackBarModule,
    AngularPaginatorModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatRippleModule,
    MatTooltipModule,
    MatGridListModule,
    MatRadioModule,
    MatDatepickerModule,
    MatToolbarModule,
    MdbFormsModule,
    Ng2SearchPipeModule,
    BsDatepickerModule,
    FileUploadModule,
    NgxPrintModule,
    NgxPaginationModule
  
  
  ],
  declarations: [
    AppComponent,
    TableListComponent,
    UserProfileComponent,
    ExperienceFormComponent,
    ProjectFormComponent,
    ProfileImageComponent,
    EducationFormComponent,
    CertificationFormComponent,
    EditRoleComponent,
    EditProfileComponent,
    RoomsComponent,
    CalendarComponent,
    AddRoomComponent,
    RoomEventsComponent,
    EventDtailsComponent,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
