import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import {MatFormFieldModule} from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatFormFieldModule,
    MatTableModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,

   
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,

    
  ]
})
export class ComponentsModule { }
