
import { catchError, Observable, Subscription, switchMap, throwError } from 'rxjs';
import { UploadService } from 'app/upload.service';


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/auth.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from 'model/user';
@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  success=false;
  registerForm : FormGroup;
  checked = false;
  file : File=null;
  user : User;
  drivingLicense: any;
  
  constructor(private AuthService: AuthService, private router: Router,private http : HttpClient, private fb: FormBuilder , private UploadService : UploadService) { }
  ngOnInit(): void {
    this.registerForm= this.fb.group({
    image: [''],
    fullName: [''],
    email: [''],
    password: [''] ,
    confirmPassword: [''],
    phone: [''],
    DateOfBirth: [''] ,
    Gender : [''],
    nationality:[''],
    familySituation:[''],
    address:[''],
    roles:[''],
    experience:[''],
    hiringDate:[''],
    department:[''],
    drivingLicense:['true'],
    title:['']



    })
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
  // if (this.file && this.registerForm.valid) {
  //   this.UploadService.uploadFormData(this.file).pipe(
  //     switchMap(uploadResponse => {
  //       const formData = new FormData();
  //       formData.append('fullName', this.registerForm.value.fullName);
  //       formData.append('password', this.registerForm.value.password);
  //       formData.append('email', this.registerForm.value.email);
        
  //       formData.append('image', uploadResponse.file);
  //       formData.append('imageName', uploadResponse.filename);
  //       return this.AuthService.signup(this.registerForm,formData);
  //     }),
  //     catchError(this.handleError)
  //   ).subscribe(
  //     response => {
  //       console.log('Signup successful:', response);
  //       // Handle successful signup
  //     },
  //     error => {
  //       console.error('Signup error:', error);
  //       // Handle signup error
  //     }
  //   );
  // }
  
  }