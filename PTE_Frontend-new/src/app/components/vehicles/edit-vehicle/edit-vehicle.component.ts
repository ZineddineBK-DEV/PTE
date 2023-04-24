import { HttpClient } from '@angular/common/http';
import { Component,Inject,Input,OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Vehicle } from 'model/vehicle';
import { VehiclesService } from '../vehicles.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'edit-vehicle',
  templateUrl: './edit-vehicle.component.html',
  styleUrls: ['./edit-vehicle.component.css'],
  providers: [MatSnackBar]
})
export class EditVehicleComponent {
  

  
  vehicles : Vehicle[];
  dataSource: any;
  form: FormGroup;
  vehicle : Vehicle;

  constructor(private formBuilder: FormBuilder,
     private dialogRef: MatDialogRef<EditVehicleComponent> ,
     private http:HttpClient , private vehiclesService:VehiclesService ,
      private snackBar: MatSnackBar,
      @Inject(MAT_DIALOG_DATA) public data: { vehicleId: string, vehicle: Vehicle }
      
      ) { }

 

      ngOnInit() {
        this.form = this.formBuilder.group({
          model: [this.data.vehicle.model,Validators.required],
          registration_number: [this.data.vehicle.registration_number,[Validators.required,this.registrationNumberValidator]],
          type: [this.data.vehicle.type,Validators.required],
        });
        
      }
    
      updateVehicle(form: FormGroup) {
        if (this.form.valid) {
        const vehicle = {
          model: form.value.model,
          registration_number: form.value.registration_number,
          type: form.value.type,
        };
        this.http.patch<Vehicle>(`http://localhost:3001/api/material/vehicle/update/${this.data.vehicleId}`, vehicle)
        .subscribe(
          newVehicle => {
            this.snackBar.open('Vehicle updated successfully', 'Close', { duration: 3000 });
          },
          error => {
            if (error.status === 400) {
              console.log('registration number already exists');
              this.snackBar.open('Registration number already exists', 'Close', { duration: 3000 });
            }
          }
        );
      }
    }
    
      cancel() {
        this.dialogRef.close();
      }
    
      registrationNumberValidator(control: FormControl): { [s: string]: boolean } | null {
        console.log('Registration number:', control.value);
        const pattern = /^[1-9]\d{0,2} \d{1,4}$/;
        if (control.value && !pattern.test(control.value)) {
          console.log('Invalid registration number');
          return { 'invalidRegistrationNumber': true };
        }
        console.log('Valid registration number');
        return null;
      }

 
    


}
