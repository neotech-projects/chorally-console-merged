import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstanceRefrenceComponent } from './instance-refrence.component';

describe('InstanceRefrenceComponent', () => {
  let component: InstanceRefrenceComponent;
  let fixture: ComponentFixture<InstanceRefrenceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstanceRefrenceComponent]
    });
    fixture = TestBed.createComponent(InstanceRefrenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
