import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { UserService } from 'app/services/userService.service';
import { User } from 'model/user';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';
import { EditRoleComponent } from './edit-role/edit-role.component';
import { Router } from '@angular/router';



@Component({
 
  selector: 'user-management-list',

  templateUrl: './user-mangemnt.component.html' ,
  styleUrls: ['./user-management.css']
})


export class TableListComponent implements OnInit, AfterViewInit{

  // @ViewChild(MdbTablePaginationComponent) mdbTablePagination: MdbTablePaginationComponent;
  // @ViewChild(MdbTableDirective) mdbTable: MdbTableDirective;

  elements: any = [];
  previous: any = [];
  p: number = 1;
  headElements = ['ID', 'First', 'Last', 'Handle'];

  searchName;searchDepartment;searchTitle
  users: any;

  constructor(private userService: UserService,
    private dialog : MatDialog ,
    private router :Router) {}
  
  
  
  ngOnInit() : void{
    this.userService.getData().subscribe((resultData:any) =>{
      this.users = resultData as User[];
      console.log("*** users ***")
      console.log(this.users);
    })
    
  }
  

  ngAfterViewInit() {
  }

  clearInput(): void{

    this.searchName='';
    this.searchDepartment='';
    this.searchTitle='';
  }
  
  onEditRole(user){
    this.router.navigate(['/user-profile']);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    dialogConfig.width = "30%";
    dialogConfig.height="35%";
    dialogConfig.data=user;
    this.dialog.open(EditRoleComponent, dialogConfig)
  }
    
  onDelete(id){
    this.userService.deleteUser(id).subscribe(resultat=>{
      location.reload();
    })
  }

}
