import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomEventsComponent } from './room-events.component';

describe('RoomEventsComponent', () => {
  let component: RoomEventsComponent;
  let fixture: ComponentFixture<RoomEventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoomEventsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
