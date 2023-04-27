import { HttpClient , HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { MatDialogConfig , MatDialog} from '@angular/material/dialog';
import { catchError, Observable, throwError } from 'rxjs';
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient ,
                private dialog:MatDialog) {}

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError ('Something bad happened; please try again later.');
  }

  getData() {
    return this.http.get('http://localhost:3001/api/users/getall');
  }
  

  getUserByID(id:any){
    return this.http.get('http://localhost:3001/api/users/'+id)
  }
  
  updateUser(id: any, data: any) {

    return this.http.patch('http://localhost:3001/api/users/update/'+id, data);
  }

  deleteUser(id:string): Observable<any>{
    return this.http.delete('http://localhost:3001/api/users/delete/'+id).pipe(
      catchError(this.handleError)
    )
  }

  updateUserRoles(id:any,data:any): Observable<any>{
      return this.http.patch('http://localhost:3001/api/users/update-roles/'+id,data,
      {
        headers: {
                Authorization: "Bearer ",
                "Content-Type": "application/json",
      }
      },
    )
  }

  populateForm(user) {
    //this.form.setValue(_.omit(user,'_id'));
  }

}

