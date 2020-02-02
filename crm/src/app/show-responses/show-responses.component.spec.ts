import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowResponsesComponent } from './show-responses.component';

describe('ShowResponsesComponent', () => {
  let component: ShowResponsesComponent;
  let fixture: ComponentFixture<ShowResponsesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowResponsesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowResponsesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
