import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListForClientComponent } from './list-for-client.component';

describe('ListForClientComponent', () => {
  let component: ListForClientComponent;
  let fixture: ComponentFixture<ListForClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListForClientComponent]
    });
    fixture = TestBed.createComponent(ListForClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
