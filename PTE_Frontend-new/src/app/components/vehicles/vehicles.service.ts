import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Vehicle } from 'model/vehicle';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { EventInput } from '@fullcalendar/core';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {
  private selectedDateSource = new BehaviorSubject<string>('');
  selectedDate = this.selectedDateSource.asObservable();


  selectedVehicleId: string;
  dateStart: Date;
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

  setDateRange(dateStart: Date) {
    this.dateStart = dateStart;
    
  }

  getVehicleEvents(start: string, end: string , vehicleId: string) {
    const startISO = new Date(start).toISOString().slice(0, 16); // format start date
    const endISO = new Date(end).toISOString().slice(0, 16); // format end date
    return this.http.get(`http://localhost:3001/api/material/vehicle/events?start=${startISO}&end=${endISO}&vehicle=${vehicleId}`)
      .pipe(
        map((events: any[]) => {
          const acceptedEvents: EventInput[] = [];
          const rejectedEvents: EventInput[] = [];
  
          events.forEach(event => {
            const eventInput: EventInput = {
              title: event.title,
              start: event.start,
              end: event.end
            };
  
            if (event.isAccepted) {
              acceptedEvents.push(eventInput);
            } else {
              rejectedEvents.push(eventInput);
            }
          });
  
          return { acceptedEvents, rejectedEvents };
        })
      );
  }
  


}
