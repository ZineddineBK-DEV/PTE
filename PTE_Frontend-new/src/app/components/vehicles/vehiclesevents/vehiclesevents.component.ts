import { Vehicle } from 'model/Vehicle';
import { Component, OnInit , ViewChild  } from '@angular/core';
import { VehiclesService } from '../vehicles.service';
import { HttpClient } from '@angular/common/http';
import { CalendarOptions  } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import interactionPlugin from '@fullcalendar/interaction';
import { EventformComponent } from '../eventform/eventform.component';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'vehiclesevents',
  templateUrl: './vehiclesevents.component.html',
  styleUrls: ['./vehiclesevents.component.css']
})
export class VehicleseventsComponent implements OnInit {
  vehicles : Vehicle[];
  searchText: string = '';
    dataSource: any;
    selectedVehicleId: string;
    showForm: boolean = false;
  form: any = {};
    
  constructor(private vehiclesService : VehiclesService , private http : HttpClient , private formBuilder: FormBuilder, private dialog: MatDialog ){}
  ngOnInit() {
    this.vehiclesService.getVehicle().subscribe((vehicles) => {
      this.vehicles = vehicles;
    });
      
  }
  
 
  
  
  search() {
    this.http.get("http://localhost:3001/api/material/vehicle/search?text=" + this.searchText).subscribe((data: any[]) => {
      this.vehicles = data;
    });
  }
    

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: "dayGridMonth",
    dateClick: function (info) {
      console.log("Date clicked: " + info.dateStr);
    },
  }
  DateClick(info: any) {
    this.vehiclesService.setDateRange(info.dateStr, info.dateStr);

  }

  
  
 
  @ViewChild('calendar') calendarComponent:FullCalendarComponent ;
  
  
  onVehicleClick(vehicleId: string) {
    this.vehiclesService.setSelectedVehicleId(vehicleId);

  }
  createEvent(start: Date, end: Date) {
    const data = {
      title: 'New Event',
      start: start,
      end: end,
      vehicle: this.selectedVehicleId,
      applicant: '',
      driver: '',
      destination: '',
    };
  
    this.http.post('http://localhost:3001/api/vehicle-event', data).subscribe(
      (response) => {
        console.log('Event created successfully!');
        // refresh the calendar to show the new event
        this.calendarComponent.getApi().refetchEvents();
      },
      (error) => {
        console.log('Error creating event:', error);
      }
    );
  }
  openMiniForm() {
    const dialogRef = this.dialog.open(EventformComponent);
  
    dialogRef.afterClosed().subscribe(() => {
      
      console.log('Mini form dialog closed');
    });
  }
  
}
