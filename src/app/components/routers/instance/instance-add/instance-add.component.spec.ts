import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstanceAddComponent } from './instance-add.component';

describe('InstanceAddComponent', () => {
  let component: InstanceAddComponent;
  let fixture: ComponentFixture<InstanceAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstanceAddComponent]
    });
    fixture = TestBed.createComponent(InstanceAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
