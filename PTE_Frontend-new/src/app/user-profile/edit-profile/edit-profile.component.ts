import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CvService } from 'app/services/cv.service';
import { UserService } from 'app/services/userService.service';

@Component({
  selector: 'edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent {

  DateOfBirdthObj: any = {};
  HiringDateObj: any = {};
  selectedString: string = '';

  constructor(private dialogRef : MatDialogRef<EditProfileComponent>,
              public userService :UserService,
              @Inject(MAT_DIALOG_DATA) public data: any){}

  ngOnInit() :void{
  
    this.DateOfBirdthObj = new Date(this.data.DateOfBirth);
    this.HiringDateObj = new Date(this.data.hiringDate);
    
  }

  selectedDepartment;
  departmentChanged =false;
  onSelectionDepartment(selectedValue: string) {
    this.selectedDepartment = selectedValue;
    console.log(this.selectedDepartment)
    this.departmentChanged =true;
  }

  selectedGender;
  genderChanged =false;
  onSelectionGender(selectedValue: string) {
    this.selectedGender = selectedValue;
    this.genderChanged = true;
    
  }

  selectedfamilySituation;
  familySituationChanged = false;
  onSelectionfamilySituation(selectedValue: string) {
    console.log(selectedValue)
    
    this.selectedfamilySituation = selectedValue;console.log(this.selectedfamilySituation)
    this.familySituationChanged =true;
  }

  onUpdate(d:any){
    
    if(this.departmentChanged){
      d.department=this.selectedDepartment
    }
    else{
      d.department=this.data.department
    }

    if(this.familySituationChanged){
      d.familySituation=this.selectedfamilySituation
    }
    else{
      d.familySituation=this.data.familySituation
    }

    if(this.genderChanged){
      d.gender=this.selectedGender
    }
    else{
      d.gender=this.data.gender
    }
    
     console.log(d)
    this.userService.updateUser(this.data._id,d).subscribe(response=>
      {
      console.log(response)
      location.reload()
    })
  }

  onClose(){
    this.dialogRef.close();
  }

  

  
}
