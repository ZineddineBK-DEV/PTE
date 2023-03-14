import { Vehicle } from 'model/Vehicle';
import { Component, OnInit } from '@angular/core';
import { VehiclesService } from './vehicles.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { AddcarComponent } from './addcar/addcar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.css'],
  providers: [MatSnackBar]
})
export class VehiclesComponent implements OnInit{
vehicles : Vehicle[];
searchText: string = '';
  dataSource: any;
  
  
constructor(private vehiclesService : VehiclesService , private http : HttpClient , private dialog: MatDialog , private snackBar: MatSnackBar){}
ngOnInit() {
  this.vehiclesService.getVehicle().subscribe((vehicles) => {
    this.vehicles = vehicles;
  });
    
}

openMiniForm() {
  const dialogRef = this.dialog.open(AddcarComponent);

  dialogRef.afterClosed().subscribe(() => {
    
    console.log('Mini form dialog closed');
  });
}
deleteVehicle(vehicleid:String){
  this.http.delete("http://localhost:3001/api/material/vehicle/deleteVehicle/"+vehicleid).subscribe(() => {
    this.vehicles = this.vehicles.filter(v => v._id !== vehicleid);
    this.snackBar.open('Car deleted successfully', 'Dismiss', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  });
 
}

search() {
  this.http.get("http://localhost:3001/api/material/vehicle/search?text=" + this.searchText).subscribe((data: any[]) => {
    this.vehicles = data;
  });
}
addVehicle(form : FormGroup){
  
  const vehicle={
        model: form.value.model,
        registration_number: form.value.registration_number,
        type: form.value.type,
  }
  this.http.post<Vehicle>("http://localhost:3001/api/material/vehicle/addVehicle",vehicle).subscribe(newVehicle => {
    this.vehicles.push(newVehicle); 
    this.dataSource.data = this.vehicles; 
    this.snackBar.open('Vehicle added successfully', 'Close', { duration: 3000 });
  });
}
  
  
}
