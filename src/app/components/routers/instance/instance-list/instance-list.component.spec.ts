import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstanceListComponent } from './instance-list.component';

describe('InstanceListComponent', () => {
  let component: InstanceListComponent;
  let fixture: ComponentFixture<InstanceListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstanceListComponent]
    });
    fixture = TestBed.createComponent(InstanceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
