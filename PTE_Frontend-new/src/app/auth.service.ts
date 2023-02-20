import { AuthData } from './../model/authData';

import { Form, FormGroup, NgForm } from '@angular/forms';
import { User } from 'model/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _loginUrl = "/api/login";
  private _SignuUpUrl = "/api/users/signup";
  isAuthenticated?: boolean;
  private userId: string;
  private user :User;
  private token?: string;
  private authStatusListener = new Subject<boolean>();
  
  constructor(private http: HttpClient,private router:Router) { }
  
  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }
  
  getUserId(){
    return this.http.get<User>(this.userId)
  }
  
  loginUser(user){
   this.http.post<User>(this._loginUrl, user).subscribe(response => {
    console.log(response);
    this.token=response.token;
    if(this.token){
      this.setAuthTimer(response.expiresIn)
      this.isAuthenticated=true;
      this.userId=response.id;
      console.log(this.userId);
      const now = new Date();
      const expirationDate = new Date(now.getTime() + response.expiresIn * 1000);
      this.saveAuthData(this.token,expirationDate)
      this.authStatusListener.next(true);
      this.http.get<User>(`this._loginUrl${user}`).subscribe(responce => {
        this.user=responce;
      })
      this.router.navigate(["/"]);
    }

  })
  return this.token;
  }
  
  signup(form:FormGroup){
    let success;
    console.log(form.value)
    const user = {
     /* Image:form.value.image,*/
      fullName:form.value.fullName,
      email:form.value.email,
      password:form.value.password,
      birthdate:form.value.birthdate,
      phone:form.value.phone,
    }
    this.http.post(this._SignuUpUrl,user).subscribe(response => {
      if(response["error"]){
        success = false;
        return null;
      }
      success=true
      this.router.navigate(["/login"])
    })
    return success;
  }
  
  setAuthTimer(expiresIn:number){
    setTimeout(() =>{
      this.logout();

    },expiresIn*1000);
  }

  logout(){
    this.token="";
    this.isAuthenticated=false;
    this.authStatusListener.next(false)
    this.clearAuthData();

    this.router.navigate(["/login"]);
  }
  private saveAuthData(token:string, expirationDate:Date){
    localStorage.setItem("token",token);
    localStorage.setItem("expiration",expirationDate.toISOString());
    localStorage.setItem("userId",this.userId);
    console.log(localStorage.getItem("token"));
    console.log(localStorage.getItem("expiration"))
  }
  private clearAuthData(){
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
  }
  private getAuthData(){
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration")
    this.userId=localStorage.getItem("userId")
    if(!token || !expirationDate) return null;
    return {token:token,expirationDate:new Date(expirationDate)}
  }


}


