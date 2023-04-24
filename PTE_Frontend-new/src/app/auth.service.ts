import { loged } from './../model/loged';
import { AuthData } from './../model/authData';
import jwt_decode from 'jwt-decode';
import { Form, FormGroup, NgForm } from '@angular/forms';
import { User } from 'model/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject, Observable, throwError } from 'rxjs';
import { UploadService } from './upload.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';


@Injectable({
  providedIn: 'root'
  
})
export class AuthService {
  private apiBaseUrl = "http://localhost:3001/api";
  private _loginUrl = "http://localhost:3001/api/login";
  private _SignuUpUrl = "http://localhost:3001/api/users/signup";
  private _BaseUrl = "http://localhost:3001/api/users/signup/requests";
  private _DeleteUrl = "http://localhost:3001/api/users/delete/:id"
  private _id = "http://localhost:3001/api/users/:id"
  isAuthenticated?: boolean;
  private userId: string;
  private roles: String;
  public user;
  private token?: string;
  private authStatusListener = new Subject<boolean>();
  file: File = null;
  image;

  constructor(private http: HttpClient, private router: Router, private UploadService: UploadService ,public dialog: MatDialog ) { }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getUserId(userID: string): Observable<User> {
    const url = `${this.apiBaseUrl}/users/:id${this.userId}`;
    return this.http.get<User>(url);
  }
  

  loginUser(user) {
    this.http.post<User>(this._loginUrl, user).subscribe(response => {
      console.log(response);
      this.token = response.token;
      if (this.token) {
        this.setAuthTimer(response.expiresIn)
        
        this.userId = response._id;
        console.log(this.userId);
        const now = new Date();
        const expirationDate = new Date(now.getTime() + response.expiresIn * 1000);
        this.saveAuthData(this.token, expirationDate)
        this.authStatusListener.next(true);

        this.user = this.getUser(response.token);
        
        this.router.navigate(["/dashboard"]);
      }

    })
    return this.token;
  }
  isAuthed():boolean{
    return localStorage.getItem('token')!=undefined;
}
checkEmailExists(email: string): Observable<boolean> {
  return this.http.get<boolean>(`${this.apiBaseUrl}/users/email-exists?email=${email}`);
}


  signup(form: FormGroup, file : File) {
    let success;
    console.log(form.value);
     

    const user = {
      image: file.name,
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      email: form.value.email,
      password: form.value.password,
      DateOfBirth: form.value.DateOfBirth,
      gender: form.value.gender,
      phone: form.value.phone,
      nationality: form.value.nationality,
      familySituation: form.value.familySituation,
      address: form.value.address,
      experience: form.value.experience,
      hiringDate: form.value.hiringDate,
      department: form.value.department,
      drivingLicense: form.value.drivingLicense,
      
    }



    this.http.post<User>(this._SignuUpUrl, user).subscribe(
      response => {
        
      console.log(response);
      
      this.router.navigate(['/login']);
    },
    error => {
      if (error.status === 400) {
        console.log('Email already exists');
        const dialogRef = this.dialog.open(ErrorDialogComponent, {
          data: { message: 'Email already exists' },
        });
        success=false
      }
    }
  );
  return success
  }

  setAuthTimer(expiresIn: number) {
    setTimeout(() => {
      this.logout();

    }, expiresIn * 1000);
  }

  logout() {
    this.token = "";
    this.isAuthenticated = false;
    this.authStatusListener.next(false)
    this.clearAuthData();

    this.router.navigate(["/login"]);
  }
  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("userId", this.userId);
    console.log(localStorage.getItem("token"));
    console.log(localStorage.getItem("expiration"))
  }
  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
  }
  // private getAuthData() {
  //   const token = localStorage.getItem("token");
  //   const expirationDate = localStorage.getItem("expiration")
  //   this.userId = localStorage.getItem("userId")
  //   this.roles = localStorage.getItem("roles")
  //   if (!token || !expirationDate) return null;
  //   return { token: token, expirationDate: new Date(expirationDate), role: String }
  // }
  getSignUpRequests(): Observable<any> {
    // return this.http.get<User>(this._BaseUrl);
    const url = `${this._BaseUrl}?isEnabled=false`; // Add the query parameter to filter disabled users
    return this.http.get<User[]>(url);

  }
   getUser(token: string): User {
    const roles = JSON.parse(atob(token.split('.')[1])) as User;
    return roles;

  }

  forgotPassword(email:string){
    return this.http.post("http://localhost:3001/api/users/forgotPassword", { email });

  }
  getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    this.userId = localStorage.getItem("userId");
    this.token = token;
    
    const decodedToken = jwt_decode(token) as { roles: string }; // Decode the token and cast it to the expected type
    this.roles = decodedToken.roles;

    if (!token || !expirationDate) {
      return null;
    }

    return {
      token: this.token,
      
      roles: this.roles,
      userId: this.userId
    };
  }

}


