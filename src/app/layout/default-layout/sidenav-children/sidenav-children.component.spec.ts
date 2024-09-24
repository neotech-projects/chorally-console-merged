import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavChildrenComponent } from './sidenav-children.component';

describe('SidenavChildrenComponent', () => {
  let component: SidenavChildrenComponent;
  let fixture: ComponentFixture<SidenavChildrenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidenavChildrenComponent]
    });
    fixture = TestBed.createComponent(SidenavChildrenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
