import { Component, OnInit  } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'app/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    loginFailed=false;
    loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  })
  
    constructor(private authService: AuthService,private router:Router){}

    ngOnInit() {
    
    }
/*loginUser(){
  this._auth.loginUser(this.loginForm.value)
  .subscribe(data=>{
    console.log(data)
    
  
  })
  }*/
  onSubmit(){

    const token=this.authService.loginUser(this.loginForm.value);
    if(token){
      this.loginFailed=false;
      this.router.navigate(['']);
    }else{
      this.loginFailed=true;
    }
  }
   


}
