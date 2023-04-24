import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoomsService } from 'app/services/rooms.service';

@Component({
  selector: 'event-dtails',
  templateUrl: './event-dtails.component.html',
  styleUrls: ['./event-dtails.component.css']
})
export class EventDtailsComponent {

  events : any [] ;
  event ;
  imageSrc;
  dateStart:any ; dateEnd :any;
  timeStart:any; timeEnd :any;
   body = {
    isAccepted: "true"
  };


  constructor( private roomService : RoomsService,
              @Inject(MAT_DIALOG_DATA) public data: any){
                console.log('data :',this.data)
                           
  }


  ngOnInit() : void{
    this.roomService.getRoomEvent(this.data.room).subscribe((resultData:any) =>{
      this.events = resultData;
      console.log('events ',this.events)
  
      this.event = this.events.filter(item => item._id === this.data._id);

      const dateObjStart = new Date(this.event[0].start);
      this.dateStart = dateObjStart.toISOString().substr(0, 10);
      this.timeStart = dateObjStart.toISOString().substr(11, 5);

      const dateObjEnd = new Date(this.event[0].end);
      this.dateEnd = dateObjEnd.toISOString().substr(0, 10);
      this.timeEnd = dateObjEnd.toISOString().substr(11, 5);



      this.imageSrc = 'http://localhost:3001/images/' +this.event[0].applicant.image;
    });
  }

  acceptEvent(){
    this.roomService.confirmEvent(this.data._id,this.body).subscribe(resultat=>{
      location.reload();
    })
  }

  deleteEvent(id:any){
    this.roomService.deleteEvent(id).subscribe(resultat=>{
      location.reload();
    })
  }           

}
