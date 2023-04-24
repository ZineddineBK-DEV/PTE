
import {  Observable, throwError } from 'rxjs';
import { UploadService } from 'app/upload.service';


import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/auth.service';
import { HttpClient } from '@angular/common/http';
import { User } from 'model/user';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [MatSnackBar]

})
export class SignupComponent implements OnInit {
  
  success=false;
  registerForm : FormGroup;
  checked = false;
  file : File=null;
  user : User;
  drivingLicense: any;
  
  constructor(private AuthService: AuthService, private router: Router,private http : HttpClient, private fb: FormBuilder , private UploadService : UploadService,private snackBar: MatSnackBar) { }
  ngOnInit(): void {
    this.registerForm= this.fb.group({
    image: ['',Validators.required],
    firstName: ['',Validators.required],
    lastName: ['',Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['',[Validators.required, Validators.minLength(6)]] ,
    confirmPassword: ['', [Validators.required, this.matchValues('password')]],
    phone: ['' , [Validators.required, Validators.maxLength(8), Validators.minLength(8) , Validators.pattern('^[0-9]*$')]],
    DateOfBirth: ['',Validators.required] ,
    gender : ['',Validators.required],
    nationality:['',Validators.required],
    familySituation:['',Validators.required],
    address:['',Validators.required],
    experience:['',Validators.required],
    hiringDate:['',Validators.required],
    department:['',Validators.required],
    drivingLicense:['true',Validators.required],
    



    })
   }

   matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const input = control.value;
      const isValid = control.root.value[matchTo] === input;
      return isValid ? null : { 'matchValues': true };
    };
  }
  

  
   
  
  onFileSelected(event) {
  console.log(event.target.files[0])
  this.file = event.target.files[0]}

  private handleError(error: any): Observable<any> {
    // Handle error here
    console.error('An error occurred:', error);
    return throwError(error);
  }

  
  onSubmit(image){
    
    
    
     if (this.file && this.registerForm.valid) {
        this.UploadService.uploadFormData(this.file).subscribe();
        const image : File = this.file;
      
       this.success=this.AuthService.signup(this.registerForm , image);
      
   }}
  
  
  }