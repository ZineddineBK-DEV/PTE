import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'verificationcode',
  templateUrl: './verificationcode.component.html',
  styleUrls: ['./verificationcode.component.css']
})
export class VerificationcodeComponent {

constructor(private http : HttpClient , private router:Router){}



  validateCode(code : string){
   this.http.post("http://localhost:3001/api/users/validateCode",{code}).subscribe();
   this.router.navigate(['/changepassword']);
  }
}
