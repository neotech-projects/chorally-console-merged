import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageSubDetailComponent } from './package-sub-detail.component';

describe('PackageSubDetailComponent', () => {
  let component: PackageSubDetailComponent;
  let fixture: ComponentFixture<PackageSubDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PackageSubDetailComponent]
    });
    fixture = TestBed.createComponent(PackageSubDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
