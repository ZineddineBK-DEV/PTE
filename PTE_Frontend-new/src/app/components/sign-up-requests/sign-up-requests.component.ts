
import { HttpClient } from '@angular/common/http';
import { AuthService } from './../../auth.service';
import { User } from './../../../model/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sign-up-requests',
  templateUrl: './sign-up-requests.component.html',
  styleUrls: ['./sign-up-requests.component.css']
})


 
export class SignUpRequestsComponent implements OnInit{
users : User[];
deleteError: string;
  deleteSuccess: string;
  private _DeleteUrl = "http://localhost:3001/api/users/delete/:";
  private _ConfirmUrl= "http://localhost:3001/api/users/confirm-signup/";
  user: User;
  file;

constructor( private AuthService: AuthService , private http : HttpClient){}
ngOnInit() {
  this.AuthService.getSignUpRequests().subscribe((users) => {
    this.users = users;
  });
  
}
deleteUser(userId:string){
  
  this.http.delete(this._DeleteUrl+userId).subscribe();
  
  }
  confirmSignUp(userId:string){
   this.http.post(this._ConfirmUrl+userId, {}).subscribe();
  }




}

