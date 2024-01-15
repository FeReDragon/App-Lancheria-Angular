import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDishOfTheDayComponent } from './manage-dish-of-the-day.component';

describe('ManageDishOfTheDayComponent', () => {
  let component: ManageDishOfTheDayComponent;
  let fixture: ComponentFixture<ManageDishOfTheDayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageDishOfTheDayComponent]
    });
    fixture = TestBed.createComponent(ManageDishOfTheDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
