import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDtailsComponent } from './event-dtails.component';

describe('EventDtailsComponent', () => {
  let component: EventDtailsComponent;
  let fixture: ComponentFixture<EventDtailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventDtailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventDtailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
