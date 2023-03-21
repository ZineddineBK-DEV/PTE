import { Component } from '@angular/core';
import { CalendarOptions, EventInput } from "@fullcalendar/core";
import dayGridPlugin from '@fullcalendar/daygrid';
import { Calendar } from "@fullcalendar/core";
import interactionPlugin from '@fullcalendar/interaction';


@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']   
})
export class CalendarComponent {
  showForm: boolean = false;
  form: any = {};


   calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: "dayGridMonth",
    dateClick: function (info) {
      console.log("Date clicked: " + info.dateStr);
    },
  }
  onDateClick(info: any) {
    this.showForm = true;
    this.form.start = info.dateStr;
    this.form.end = info.dateStr;
  }

  
  
  
  
  
  
  
  
}
