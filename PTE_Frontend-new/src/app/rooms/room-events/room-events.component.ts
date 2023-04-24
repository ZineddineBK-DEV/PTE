import { Component ,  Inject,  OnInit, ViewChild} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DateTimePickerComponent } from '@syncfusion/ej2-angular-calendars';
import { RoomsService } from 'app/services/rooms.service';
declare var $: any;
@Component({
  selector: 'room-events',
  templateUrl: './room-events.component.html',
  styleUrls: ['./room-events.component.css']
})

export class RoomEventsComponent  {
  
  startValue;
  endValue: Date;
  errorDate :boolean;
  res:any;
  

  @ViewChild('startPicker') startPicker!: DateTimePickerComponent;
  @ViewChild('endPicker') endPicker!: DateTimePickerComponent;
  
  constructor(private dialogRef : MatDialogRef<RoomEventsComponent>,
              private roomService : RoomsService,
              @Inject(MAT_DIALOG_DATA) public data: any){}

  ngOnInit(){
    const dateString = this.data.dateStr;
    const date = new Date(dateString);
    const formattedDate = date.toLocaleString('en-US' , { month: 'numeric', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric'});
    this.startValue = formattedDate
  }

  originaltStartDate;
  originaltEndDate;
  submit(d:any){

    const starttValue = this.startPicker.value; 
    const endValue = this.endPicker.value; 
    
    this.originaltStartDate = new Date(starttValue);  
    this.originaltEndDate = new Date(endValue); 

    this.checkDate();
    
    //start date
    this.originaltStartDate.setDate(this.originaltStartDate.getDate());  
    // const newStartDateTimestamp = this.originaltStartDate.getTime() + 3600 * 1000; // add one hour in milliseconds
    const newStartDate = new Date(this.originaltStartDate).toISOString();    
    //end date
    this.originaltEndDate.setDate(this.originaltEndDate.getDate()); 
    // const newEndDateTimestamp = this.originaltEndDate.getTime() + 3600 * 1000; // add one hour in milliseconds
    const newEndtDate = new Date(this.originaltEndDate).toISOString(); 
    

    d.start =newStartDate;
    d.end =newEndtDate;
    d.room = this.data.room;
    d.applicant ='6328348e74041f0d855647cf'
    
    
    if(!this.errorDate){
      this.roomService.setRoomEvent(d).subscribe({
        next: resultat => {
          //console.log('Success: ', resultat);
          this.showNotification('top','center','success','Event created');
          setTimeout(() => {window.location.reload();}, 1000);
        },
        error: err => {
          //console.log('Error: ', err);
          this.showNotification('top','center','danger','Date already reserved');
        },
        complete: () => {
        }
      });
    }
  }

  showNotification(from, align,col,message){

    $.notify({
        icon: "notifications",
        message: message,

    },{
        type: col,
        timer: 1000,
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

checkDate() {
  if (this.originaltStartDate >= this.originaltEndDate || this.originaltStartDate.getTime() === this.originaltEndDate.getTime()) {
    this.errorDate = true;
  } else {
    this.errorDate = false;
  }
  
}

  close(){
    this.dialogRef.close();
  }

}



