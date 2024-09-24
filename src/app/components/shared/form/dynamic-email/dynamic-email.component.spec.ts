import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicEmailComponent } from './dynamic-email.component';

describe('DynamicEmailComponent', () => {
  let component: DynamicEmailComponent;
  let fixture: ComponentFixture<DynamicEmailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DynamicEmailComponent]
    });
    fixture = TestBed.createComponent(DynamicEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
