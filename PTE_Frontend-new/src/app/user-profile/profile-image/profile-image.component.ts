import { HttpClient } from '@angular/common/http';
import { Component, ViewChildren, ElementRef, Inject , QueryList} from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'app/services/userService.service';
import { TableListComponent } from 'app/user-management/user-management';
import { User } from 'model/user';
import { UserProfileComponent } from '../user-profile.component';
declare var $: any; // Import jQuery

@Component({
  selector: 'profile-image',
  templateUrl: './profile-image.component.html',
  styleUrls: ['./profile-image.component.css']
})
export class ProfileImageComponent {

  ok : boolean;
  image:any;
  d ={}
  constructor(private dialogRef : MatDialogRef<ProfileImageComponent>,
              private dialogRef2 : MatDialogRef<UserProfileComponent>,
              private userService : UserService,
              private http : HttpClient,  
              private dialog : MatDialog,        
              @Inject(MAT_DIALOG_DATA) public data: any,
              @Inject(MAT_DIALOG_DATA) public row: any,
              @Inject(MAT_DIALOG_DATA) public atad: { parentDialog: TableListComponent }){}


@ViewChildren('imageInput') imageInputs: QueryList<ElementRef>;

onActive(): void {

  $("#image-input").click();

}

onselectImage(event) {
  const file = event.target.files[0];
  this.image =file
  console.log(this.image.name)
  const formData =new FormData();
  formData.append('image',this.image)
  console.log(this.data._id)

  if(file){
  this.http.post<any>('http://localhost:3001/file',formData).subscribe(
    )
    const d ={};
    d["image"]=this.image.name

    console.log(this.data)
    this.userService.updateUser(this.data._id,d).subscribe(response=>
      {
      console.log(response)
    })
    //reloading the page
    location.reload()

    
    
    
  }
  
}

ondelete(){
  const d ={};
  d["image"]=" "

  console.log(d)
  this.userService.updateUser(this.data._id,d).subscribe(response=>
    {
    console.log(response)
  })
  this.dialogRef.close()

  //reloading the page
  location.reload()
  
}
    
onClose(){
  this.dialogRef.close();
}
}
