import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CvService } from 'app/services/cv.service';
import { Router } from '@angular/router';


@Component({
  selector: 'certification-form',
  templateUrl: './certification-form.component.html',
  styleUrls: ['./certification-form.component.css']
})
export class CertificationFormComponent {

  cv = {
    certifications : [{}]
}

  constructor(private dialogRef : MatDialogRef<CertificationFormComponent>,
              private cvservice : CvService,
              private router: Router,
              @Inject(MAT_DIALOG_DATA) public data: any){}

  submit(d:any){
    this.cv.certifications=d;
    console.log(this.cv.certifications)
    this.cvservice.updateCV(this.data.cv._id,this.cv).subscribe(resultat =>{
      console.log(resultat)

      
      
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
