import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Vehicle } from 'model/vehicle';
import { VehiclesService } from '../vehicles.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'addcar',
  templateUrl: './addcar.component.html',
  styleUrls: ['./addcar.component.css'],
  providers: [MatSnackBar]


})
export class AddcarComponent implements OnInit{
  



  vehicles : Vehicle[];


  form: FormGroup;
  dataSource: any;

  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<AddcarComponent> ,private http:HttpClient , private vehiclesService:VehiclesService , private snackBar: MatSnackBar ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      model: [''],
      registration_number: [''],
      type: [''],
    });
  }

  save() {
    if (this.form.valid) {
      
      const vehicle={
        model: this.form.value.model,
        registration_number: this.form.value.registration_number,
        type: this.form.value.type,
  }
  this.http.post<Vehicle>("http://localhost:3001/api/material/vehicle/addVehicle",vehicle).subscribe(newVehicle => {
   
    this.snackBar.open('Vehicle added successfully', 'Close', { duration: 3000 });
  });
    }
  }

  cancel() {
    this.dialogRef.close();
  }
  
}
