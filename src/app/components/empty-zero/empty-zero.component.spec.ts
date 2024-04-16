import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyZeroComponent } from './empty-zero.component';

describe('EmptyZeroComponent', () => {
  let component: EmptyZeroComponent;
  let fixture: ComponentFixture<EmptyZeroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmptyZeroComponent]
    });
    fixture = TestBed.createComponent(EmptyZeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
