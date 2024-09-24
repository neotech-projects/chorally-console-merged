import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicInputDateComponent } from './dynamic-input-date.component';

describe('DynamicInputDateComponent', () => {
  let component: DynamicInputDateComponent;
  let fixture: ComponentFixture<DynamicInputDateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DynamicInputDateComponent]
    });
    fixture = TestBed.createComponent(DynamicInputDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
