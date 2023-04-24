import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'app/services/userService.service';


@Component({
  selector: 'edit-role',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.css']
})
export class EditRoleComponent {


  constructor(private dialogRef : MatDialogRef<EditRoleComponent>,
              private dialog : MatDialog,
              public userService :UserService,
              @Inject(MAT_DIALOG_DATA) public data: any ){}

    ngOnInit(){
  }

  selectedRole;
  RoleChanged =false;
  onSelectionRole(selectedValue: string) {
    this.selectedRole = selectedValue;
    this.RoleChanged =true;
  }
  
  onUpdate(d:any){
    
    if(this.RoleChanged){
      d.roles=this.selectedRole
    }
    else{
      d.roles=this.data.roles
    }
    console.log(d)
    this.userService.updateUserRoles(this.data._id,d).subscribe(response=>
      {
      console.log(response)
      location.reload()
    })
  }

  
  onClose(){
    this.dialogRef.close();
  }
  

}
