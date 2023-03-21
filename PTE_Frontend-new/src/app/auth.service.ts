import { loged } from './../model/loged';
import { AuthData } from './../model/authData';

import { Form, FormGroup, NgForm } from '@angular/forms';
import { User } from 'model/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { UploadService } from './upload.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiBaseUrl = "http://localhost:3000/api";
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

  constructor(private http: HttpClient, private router: Router, private UploadService: UploadService) { }

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
        this.isAuthenticated = true;
        this.userId = response.id;
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

  signup(form: FormGroup, file : File) {
    let success;
    console.log(form.value);
     

    const user = {
      image: file.name,
      fullName: form.value.fullName,
      email: form.value.email,
      password: form.value.password,
      DateOfBirth: form.value.DateOfBirth,
      gender: form.value.gender,
      phone: form.value.phone,
      nationality: form.value.nationality,
      familySituation: form.value.familySituation,
      address: form.value.address,
      roles: form.value.roles,
      experience: form.value.experience,
      hiringDate: form.value.hiringDate,
      department: form.value.department,
      drivingLicense: form.value.drivingLicense,
      title: form.value.title,
    }



    this.http.post<User>(this._SignuUpUrl, user).subscribe(response => {
      if (response["error"]) {
        success = false;
        return null;
      }
      success = true
      this.router.navigate(["/login"])
    })
    return success;
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
  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration")
    this.userId = localStorage.getItem("userId")
    this.roles = localStorage.getItem("roles")
    if (!token || !expirationDate) return null;
    return { token: token, expirationDate: new Date(expirationDate), role: String }
  }
  getSignUpRequests(): Observable<any> {
    // return this.http.get<User>(this._BaseUrl);
    const url = `${this._BaseUrl}?isEnabled=false`; // Add the query parameter to filter disabled users
    return this.http.get<User[]>(url);

  }
  private getUser(token: string): User {
    const roles = JSON.parse(atob(token.split('.')[1])) as User;
    return roles;

  }

  forgotPassword(email:string){
    return this.http.post("http://localhost:3001/api/users/forgotPassword", { email });

  }

}


