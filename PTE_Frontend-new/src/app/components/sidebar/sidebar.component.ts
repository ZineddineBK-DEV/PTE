import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/user-management', title: 'User Management',  icon:'manage_accounts', class: '' },
    { path: '/conference-rooms', title: 'Conference Rooms',  icon:'meeting_room', class: '' },
  
    { path: '/requests' , title:'requests' , icon:'person_add' , class:''},
    { path : '/vehicles' , title:'vehicles' , icon:'directions_car' , class:''},
    {path :'/vehiclesevents' , title:'Vehicles events', icon:'directions_car' , class:''},
    {path :'/calendar' , title:'calendar', icon:'directions_car' , class:''},
    
    

    

    

    
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
