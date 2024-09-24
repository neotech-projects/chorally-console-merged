import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolTipIconComponent } from './tool-tip-icon.component';

describe('ToolTipIconComponent', () => {
  let component: ToolTipIconComponent;
  let fixture: ComponentFixture<ToolTipIconComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToolTipIconComponent]
    });
    fixture = TestBed.createComponent(ToolTipIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
