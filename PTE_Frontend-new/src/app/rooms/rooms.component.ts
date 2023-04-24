import { Component } from '@angular/core';
import { RoomsService } from 'app/services/rooms.service';
import { CalendarOptions } from "@fullcalendar/core";
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddRoomComponent } from './add-room/add-room.component';
import { RoomEventsComponent } from './room-events/room-events.component';
import { EventDtailsComponent } from './event-details/event-dtails.component';


declare var $: any;

@Component({
  selector: 'rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent {

  search:any ; filteredRooms: any[] = [];
  rooms :any; room :any ;
  roomEvents:any;
  showCalendar = false;

  constructor( private roomsService : RoomsService,
               private dialog : MatDialog , ){

  }

  ngOnInit() : void{
    this.roomsService.getRooms().subscribe((resultData:any) =>{
      this.rooms = resultData;

    })
  }

  
  toggleCalendar(id:any) {
    this.showCalendar = !this.showCalendar;
    
    this.roomsService.getRoomEvent(id).subscribe((resultData:any) =>{
      this.roomEvents = resultData;
      console.log("*** roomEvents ***")
      console.log(this.roomEvents);
  
      // to set the event color
      this.roomEvents.forEach(event => {
        event.backgroundColor = this.getEventColor(event.isAccepted);
      });
  
      this.calendarOptions.events = this.roomEvents;
    })
    this.room=id;
  }
  
  
  getEventColor(isAccepted: boolean): string {
    if (isAccepted === false) {
      return "red";
    } else {
      return "green";
    }
  }
  body : any ={} ;
  showForm: boolean = false;
  form: any = {};
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin,  interactionPlugin],
  headerToolbar: {
    start: 'title',
    center: '',
    end: 'today prev,next'
  },
  
    
    
    titleFormat: () => {
      return 'My Custom Title';
    },
    events: [],
    initialView: "dayGridMonth",
    dateClick :  (info) => {
  
      const dateString = info.dateStr;
      const date = new Date(dateString);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;
      this.openEvent(info.dateStr);

    },
  
    eventClick: (info) => {
      console.log(info.event);
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.autoFocus = true;
      dialogConfig.width = "40%";
      dialogConfig.height="55%";
      dialogConfig.data=info.event._def.extendedProps;
      this.dialog.open(EventDtailsComponent, dialogConfig)
    }
  }
  
  highlightCard() {
    const card = document.querySelector('.card');
    if (card.classList.contains('card-highlight')) {
      card.classList.remove('card-highlight');
    } else {
      card.classList.add('card-highlight');
    }
  }

  openEvent(d){
    this.body.room=this.room;
    this.body.dateStr=d;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "42%";
    dialogConfig.height="53%";
    dialogConfig.data=this.body;
    this.dialog.open(RoomEventsComponent, dialogConfig)
  }
  
  onDateClick(info: any) {
    this.showForm = true;
    this.form.start = info.dateStr;
    this.form.end = info.dateStr;
  }

  addRoom(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "36.5%";
    dialogConfig.height="50%";
    this.dialog.open(AddRoomComponent, dialogConfig)
  }

  deleteRoom(id){
    this.roomsService.deleteRoom(id).subscribe(resultat=>{
      
      this.showNotification('top', 'center')
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    })
  }

  showNotification(from, align){
    const type = ['','info','success','warning','danger'];

    const color = Math.floor((Math.random() * 4) + 1);

    $.notify({
        icon: "notifications",
        message: "Room deleted."

    },{
        type: 'success',
        timer: 3000,
        placement: {
            from: from,
            align: align
        },
        template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
}

  

  

}
