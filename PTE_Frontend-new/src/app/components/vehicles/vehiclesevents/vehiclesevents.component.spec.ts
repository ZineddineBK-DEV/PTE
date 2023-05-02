import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleseventsComponent } from './vehiclesevents.component';

describe('VehicleseventsComponent', () => {
  let component: VehicleseventsComponent;
  let fixture: ComponentFixture<VehicleseventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleseventsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleseventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
