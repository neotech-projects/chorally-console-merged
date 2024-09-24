import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageInstanceListComponent } from './package-instance-list.component';

describe('PackageInstanceListComponent', () => {
  let component: PackageInstanceListComponent;
  let fixture: ComponentFixture<PackageInstanceListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PackageInstanceListComponent]
    });
    fixture = TestBed.createComponent(PackageInstanceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
