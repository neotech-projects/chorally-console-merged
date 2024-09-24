import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicAutocompleteMultiComponent } from './dynamic-autocomplete-multi.component';

describe('DynamicAutocompleteMultiComponent', () => {
  let component: DynamicAutocompleteMultiComponent;
  let fixture: ComponentFixture<DynamicAutocompleteMultiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DynamicAutocompleteMultiComponent]
    });
    fixture = TestBed.createComponent(DynamicAutocompleteMultiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
