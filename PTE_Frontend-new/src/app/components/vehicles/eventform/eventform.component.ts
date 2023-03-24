import { Component ,OnInit} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { vehicleEvent } from 'model/vehicleEvent';
import { VehiclesService } from '../vehicles.service';
import { AuthService } from 'app/auth.service';
import { HttpClient } from '@angular/common/http';
import { User } from 'model/user';


@Component({
  selector: 'eventform',
  templateUrl: './eventform.component.html',
  styleUrls: ['./eventform.component.css']
})
export class EventformComponent implements OnInit {
  
  
  user:User;
  


  constructor(private http:HttpClient , private  authservice : AuthService ,private vehiclesService : VehiclesService ,private formBuilder: FormBuilder, private dialogRef: MatDialogRef<EventformComponent> ){}
  eventform: FormGroup;

  ngOnInit() {
    this.eventform = this.formBuilder.group({
      title:[''],
      start:[''],
      end:[''],
      
      destination:[''],
      
      
    });
  }

  cancel() {
    this.dialogRef.close();
  }
save(){
  if (this.eventform.valid) {
      
    
      const event = {
        title: this.eventform.value.title,
        start: this.eventform.value.start,
        end: this.eventform.value.end,
        vehicle: this.vehiclesService.selectedVehicleId,
        driver: localStorage.getItem("userId"),
        destination: this.eventform.value.destination,
        applicant: localStorage.getItem("userId"),
        
      }
      console.log(event)


      this.http.post<vehicleEvent>("http://localhost:3001/api/material/vehicle/setevent", event)
  .subscribe(
    (response) => {
      console.log('Event created successfully', response);
      // Reset the form and show a success message to the user
      this.eventform.reset();
      // TODO: show success message
    },
    (error) => {
      console.log('Error creating event', error);
      // Show an error message to the user
      // TODO: show error message
    }
  );

    

}}
}
