import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpauthComponent } from './empauth.component';

describe('EmpauthComponent', () => {
  let component: EmpauthComponent;
  let fixture: ComponentFixture<EmpauthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpauthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpauthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
