import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderUserComponent } from './loader-user.component';

describe('LoaderUserComponent', () => {
  let component: LoaderUserComponent;
  let fixture: ComponentFixture<LoaderUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoaderUserComponent]
    });
    fixture = TestBed.createComponent(LoaderUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
