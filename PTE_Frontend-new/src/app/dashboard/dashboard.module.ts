import { ComponentsModule } from './../components/components.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { dashboardRoutes } from './dashboard.routing';




@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(dashboardRoutes),
    ComponentsModule
  ]
})
export class DashboardModule { }
