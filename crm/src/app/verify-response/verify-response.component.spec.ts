import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyResponseComponent } from './verify-response.component';

describe('VerifyResponseComponent', () => {
  let component: VerifyResponseComponent;
  let fixture: ComponentFixture<VerifyResponseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyResponseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
