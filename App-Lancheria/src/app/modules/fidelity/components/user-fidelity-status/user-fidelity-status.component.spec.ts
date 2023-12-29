import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFidelityStatusComponent } from './user-fidelity-status.component';

describe('UserFidelityStatusComponent', () => {
  let component: UserFidelityStatusComponent;
  let fixture: ComponentFixture<UserFidelityStatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserFidelityStatusComponent]
    });
    fixture = TestBed.createComponent(UserFidelityStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
