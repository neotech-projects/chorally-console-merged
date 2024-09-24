import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstanceCreateDetailComponent } from './instance-create-detail.component';

describe('InstanceCreateDetailComponent', () => {
  let component: InstanceCreateDetailComponent;
  let fixture: ComponentFixture<InstanceCreateDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstanceCreateDetailComponent]
    });
    fixture = TestBed.createComponent(InstanceCreateDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
