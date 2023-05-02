
import { Vehicle } from 'model/Vehicle';
import { Component, OnInit , ViewChild  } from '@angular/core';
import { VehiclesService } from '../vehicles.service';
import { HttpClient } from '@angular/common/http';
import { CalendarOptions, EventInput  } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { FormBuilder} from '@angular/forms';
import interactionPlugin from '@fullcalendar/interaction';
import { EventformComponent } from '../eventform/eventform.component';
import { MatDialog} from '@angular/material/dialog';
import timeGridPlugin from '@fullcalendar/timegrid';



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
  showCalendar: boolean;

    
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
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: "timeGridWeek",
    dateClick: (info) => {
      const dialogRef = this.dialog.open(EventformComponent, {
        data: { startDate: info.dateStr },
      });
      dialogRef.afterClosed().subscribe(() => {
        console.log('Mini form dialog closed');
      });
    },
    events: (info, successCallback, failureCallback) => {
      const start = info.startStr;
      const end = info.endStr;
  
      this.vehiclesService.getVehicleEvents(start,end,this.selectedVehicleId).subscribe(
        ({ acceptedEvents, rejectedEvents }: any) => {
          const eventInputs: EventInput[] = [
            ...acceptedEvents.map(event => ({ ...event, color: 'green' })),
            ...rejectedEvents.map(event => ({ ...event, color: 'red' })),
          ];
  
          successCallback(eventInputs);
        },
        (error) => {
          failureCallback(error);
        }
      );
    }
  };

  DateClick(info: any) {
    this.vehiclesService.setDateRange(info.dateStr);

    this.openMiniForm();
  }

  
  
 
  @ViewChild('calendar') calendarComponent:FullCalendarComponent ;
  
  
  onVehicleClick(vehicleId: string) {
    this.vehiclesService.setSelectedVehicleId(vehicleId);
    this.selectedVehicleId=vehicleId;
    console.log(this.selectedVehicleId);
    this.showCalendar = true;

  }
 
  openMiniForm() {
    const dialogRef = this.dialog.open(EventformComponent);
  
    dialogRef.afterClosed().subscribe(() => {
      
      console.log('Mini form dialog closed');
    });
  }
  
}
