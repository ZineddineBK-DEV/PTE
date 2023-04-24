import { Component,OnInit,Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CvService } from 'app/services/cv.service';
import { Router } from '@angular/router';
@Component({
  selector: 'experience-form',
  templateUrl: './experience-form.component.html',
  styleUrls: ['./experience-form.component.css']
})



export class ExperienceFormComponent implements OnInit{

  cv = {
    professionnal_career: [{}]
}

  constructor(private dialogRef : MatDialogRef<ExperienceFormComponent>,
              private cvservice : CvService,
              private router :Router,
              @Inject(MAT_DIALOG_DATA) public data: any
    ){}

  
  ngOnInit(): void {
  }

  submit(d:any){
    const p = d.period_start + '-' + d.period_end
    d.period = p;
    delete d.period_end;delete d.period_start;

    this.cv.professionnal_career=d;
    this.cvservice.updateCV(this.data.cv._id,this.cv).subscribe(response=>
      {
      console.log(response)
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
