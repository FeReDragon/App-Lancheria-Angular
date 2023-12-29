import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FidelityDashboardComponent } from './fidelity-dashboard.component';

describe('FidelityDashboardComponent', () => {
  let component: FidelityDashboardComponent;
  let fixture: ComponentFixture<FidelityDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FidelityDashboardComponent]
    });
    fixture = TestBed.createComponent(FidelityDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
