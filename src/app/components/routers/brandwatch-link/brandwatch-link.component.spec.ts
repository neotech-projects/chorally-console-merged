import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandwatchLinkComponent } from './brandwatch-link.component';

describe('BrandwatchLinkComponent', () => {
  let component: BrandwatchLinkComponent;
  let fixture: ComponentFixture<BrandwatchLinkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BrandwatchLinkComponent]
    });
    fixture = TestBed.createComponent(BrandwatchLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
