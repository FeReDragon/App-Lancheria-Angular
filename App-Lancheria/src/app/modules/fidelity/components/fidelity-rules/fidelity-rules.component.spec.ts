import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FidelityRulesComponent } from './fidelity-rules.component';

describe('FidelityRulesComponent', () => {
  let component: FidelityRulesComponent;
  let fixture: ComponentFixture<FidelityRulesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FidelityRulesComponent]
    });
    fixture = TestBed.createComponent(FidelityRulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
