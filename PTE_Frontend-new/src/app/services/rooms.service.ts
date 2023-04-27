import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  constructor(private http: HttpClient) {}


  getRooms() {
    return this.http.get('http://localhost:3001/api/material/room/getRooms');
  }

  addRoom(data:any){
    return this.http.post('http://localhost:3001/api/material/room/add/', data);
  }

  deleteRoom(id:any) : Observable<any>{
    return this.http.delete('http://localhost:3001/api/material/room/delete/'+ id);
  }

  // *** Room events ***

  setRoomEvent(data:any){
    return this.http.post('http://localhost:3001/api/material/room/setevent/', data);
  }

  getRoomEvent(room:any){
    return this.http.get('http://localhost:3001/api/material/room/events?room='+room);
  }

  deleteEvent(id:any){
    return this.http.delete('http://localhost:3001/api/material/room/deleteEvent/'+ id);
  }

  confirmEvent(id:any,data:any){
    return this.http.patch('http://localhost:3001/api/material/room/acceptEvent/'+id, data);
  }
}
