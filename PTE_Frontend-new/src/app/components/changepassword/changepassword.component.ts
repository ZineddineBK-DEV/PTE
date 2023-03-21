import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  

  constructor(private route: ActivatedRoute, private http: HttpClient ,private router:Router) { }
 
  id : string;
 email:string;
  
 FormPw = new FormGroup({
    password: new FormControl('')})
  
  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.id = params.get('id');
      console.log(this.id);
  
      this.http.post<any>(`http://localhost:3001/api/users/changePswdAutorisation/${this.id}`, {}).subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log(error);
        }
      );
    });
  }
  

  onSubmit() {
    this.route.queryParamMap.subscribe(params => {
      this.email = params.get('email');
      console.log(this.id);
    
    const password = this.FormPw.value;
    
    const body = {
      email: this.email,
      password:password.password,
      id:this.id,
    };
    this.http.patch<any>(`http://localhost:3001/api/users/change-psw/${this.id}`, body).subscribe(
      response => console.log(response),
      error => console.log(error)
    );
    this.router.navigate(['/login']);
  })}
}
