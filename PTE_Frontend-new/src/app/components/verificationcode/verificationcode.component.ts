import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';


import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'verificationcode',
  templateUrl: './verificationcode.component.html',
  styleUrls: ['./verificationcode.component.css']
})
export class VerificationcodeComponent {

constructor(private http : HttpClient , private router:Router , private route: ActivatedRoute ){}
FormCode = new FormGroup({
  code: new FormControl('')})


  
  
  validateCode() {
    const code = this.FormCode.value;
    const email = this.route.snapshot.queryParamMap.get('email');
    const payload = {
      email: email,
      code: code.code
    };
    
    this.http.post("http://localhost:3001/api/users/validateCode", payload).subscribe(
      (response: any) => {
        if (response.id) {
          
          this.router.navigate(['/changepassword'],{ queryParams: { id: response.id , email } });
        } else {
          // handle invalid code here
        }
      },
      (error: any) => {
        // handle server error here
      }
    );
  }
  
  
  }
  
  
  



  
  
   
  
