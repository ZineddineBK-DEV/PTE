import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpRequestsComponent } from './sign-up-requests.component';

describe('SignUpRequestsComponent', () => {
  let component: SignUpRequestsComponent;
  let fixture: ComponentFixture<SignUpRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignUpRequestsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignUpRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
