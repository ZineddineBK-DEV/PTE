import { Component ,OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { vehicleEvent } from 'model/vehicleEvent';
import { VehiclesService } from '../vehicles.service';
import { AuthService } from 'app/auth.service';
import { HttpClient } from '@angular/common/http';
import { User } from 'model/user';
import { NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';




@Component({
  selector: 'eventform',
  templateUrl: './eventform.component.html',
  styleUrls: ['./eventform.component.css'],
  

})
export class EventformComponent implements OnInit {
  user:User;
  drivers:any[];
  selectedDriver: any;
  
   
  

  constructor(
    private http:HttpClient,
    private authservice : AuthService,
    private vehiclesService : VehiclesService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<EventformComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){}

  eventform: FormGroup;

  ngOnInit() {
    this.eventform = this.formBuilder.group({
      title:[''],
      start:[this.data.startDate],
      end:[''],
      time:[''],
      destination:[''],
      driver:[null, Validators.required],
    });
    this.http.post<any>('http://localhost:3001/api/users/filter', {
      drivingLicense: "true",
      paths: 'fullName image -cv -career',
    }).subscribe(
      (response) => {
        this.drivers = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  cancel() {
    this.dialogRef.close();
  }

  save() {
    if (this.eventform.valid ) {
      const event = {
        title: this.eventform.value.title,
        start: this.eventform.value.start,
        end:null,
        vehicle: this.vehiclesService.selectedVehicleId,
        driver: this.eventform.value.driver._id,
        destination: this.eventform.value.destination,
        applicant: localStorage.getItem("userId"),
      };
  
      if (this.eventform.value.time) {
        const time = new Date(this.eventform.value.time).toLocaleTimeString('en-US', {hour12: false});
        const endISO = new Date(this.eventform.value.end);
        endISO.setHours(parseInt(time.slice(0, 2)), parseInt(time.slice(3, 5)), 0, 0);
        event.end = endISO.toISOString();
      }
  
      

      this.http.post<vehicleEvent>("http://localhost:3001/api/material/vehicle/setevent", event)
        .subscribe(
          (response) => {
            console.log('Event created successfully', response);
            
            this.eventform.reset();
           
          },
          (error) => {
            console.log('Error creating event', error);
           
          }
        );
    }
  }
}
