import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vehicle } from 'model/vehicle';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  selectedVehicleId: string;
  dateStart: string;
  dateEnd: string;
private _Vehicle="http://localhost:3001/api/material/vehicle"
  constructor(private http: HttpClient) { }


getVehicle ():Observable<any>{
  return this.http.get<Vehicle[]>("http://localhost:3001/api/material/vehicle/getVehicles");
}

addVehicle(form : FormGroup){
  
  const vehicle={
        model: form.value.model,
        registration_number: form.value.registration_number,
        type: form.value.type,
  }
  this.http.post<Vehicle>("http://localhost:3001/api/material/vehicle/addVehicle",vehicle).subscribe();
}


  
  setSelectedVehicleId(vehicleId: string) {
    this.selectedVehicleId = vehicleId;
  }

  setDateRange(dateStart: string, dateEnd: string) {
    this.dateStart = dateStart;
    this.dateEnd = dateEnd;
  }




}
