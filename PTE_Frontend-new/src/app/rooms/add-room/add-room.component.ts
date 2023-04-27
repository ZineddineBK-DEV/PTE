import { Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RoomsService } from 'app/services/rooms.service';
declare var $: any;
@Component({
  selector: 'add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css']
})
export class AddRoomComponent {


  form: FormGroup;

  constructor(private dialogRef : MatDialogRef<AddRoomComponent>,
    private roomService : RoomsService,
    @Inject(MAT_DIALOG_DATA) public data: any){}


  submit(d:any){
    
    console.log(d)
    this.roomService.addRoom(d).subscribe(resultat =>{
      console.log(resultat)})
      this.showNotification('top','center');
      setTimeout(() => {
        window.location.reload();
      }, 2000);

      
  }

  showNotification(from, align){
    const type = ['','info','success','warning','danger'];

    const color = Math.floor((Math.random() * 4) + 1);

    $.notify({
        icon: "directions_car",
        message: "Room created."

    },{
        type: 'success',
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


  onClose(){
    this.dialogRef.close();
  }
}
