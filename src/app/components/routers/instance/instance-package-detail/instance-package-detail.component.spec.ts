import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstancePackageDetailComponent } from './instance-package-detail.component';

describe('InstancePackageDetailComponent', () => {
  let component: InstancePackageDetailComponent;
  let fixture: ComponentFixture<InstancePackageDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstancePackageDetailComponent]
    });
    fixture = TestBed.createComponent(InstancePackageDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
