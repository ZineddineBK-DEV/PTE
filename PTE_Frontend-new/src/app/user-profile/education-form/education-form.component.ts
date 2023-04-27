import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CvService } from 'app/services/cv.service';
import { ProjectFormComponent } from '../project-form/project-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'education-form',
  templateUrl: './education-form.component.html',
  styleUrls: ['./education-form.component.css']
})
export class EducationFormComponent {

  cv = {
    studies : [{}]
}

  constructor(private dialogRef : MatDialogRef<ProjectFormComponent>,
              private cvservice : CvService,
              private router :Router,
              @Inject(MAT_DIALOG_DATA) public data: any){}


ngOnInit(): void {
  console.log('**** in the projects section ****')
  console.log(this.cv)
}

submit(d:any){
  
  this.cv.studies=d;
  console.log(this.cv)
  this.cvservice.updateCV(this.data.cv._id,this.cv).subscribe(resultat =>{
    //console.log(resultat)
   })
   
   this.router.navigateByUrl(`/user-profile/${this.data._id}`)
   .then(() => {
     window.location.reload();
   });

}


onClose(){
  this.dialogRef.close();
}

}
