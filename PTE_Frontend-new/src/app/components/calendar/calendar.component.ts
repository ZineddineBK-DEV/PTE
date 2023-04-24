import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';




@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']   
})
export class CalendarComponent {
 
  currentMonth: Date = new Date();
  daysOfWeek: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  weeks: { date: Date, events: string[] }[][] = [];

  constructor() {
    this.updateCalendar();
  }

  updateCalendar() {
    const firstDayOfMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), 1);
    const lastDayOfMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 0);
    const firstDayOfWeek = firstDayOfMonth.getDay();
    const lastDayOfWeek = lastDayOfMonth.getDay();
    const numDaysInMonth = lastDayOfMonth.getDate();

    const weeks = [];
    let week = [];
    let day = 1 - firstDayOfWeek;

    for (let i = 0; i < 6; i++) {
      week = [];
      for (let j = 0; j < 7; j++) {
        if (day < 1 || day > numDaysInMonth) {
          week.push({ date: null, events: [] });
        } else {
          const date = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth(), day);
          const events = []; // TODO: Get events for this date
          week.push({ date, events });
        }
        day++;
      }
      weeks.push(week);
    }

    this.weeks = weeks;
  }

  isToday(date: Date): boolean {
    const today = new Date();
    return date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth() && date.getDate() === today.getDate();
  }

  isSelected(date: Date): boolean {
    // TODO: Implement logic to check if this date is selected
    return false;
  }

  selectDay(date: Date) {
    // TODO: Implement logic to select this date
  }

  previousMonth() {
    this.currentMonth.setMonth(this.currentMonth.getMonth() - 1);
    this.updateCalendar();
  }

  nextMonth() {
    this.currentMonth.setMonth(this.currentMonth.getMonth() + 1);
    this.updateCalendar();
  }
}
