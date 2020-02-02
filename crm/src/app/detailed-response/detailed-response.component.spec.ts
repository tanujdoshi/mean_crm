import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedResponseComponent } from './detailed-response.component';

describe('DetailedResponseComponent', () => {
  let component: DetailedResponseComponent;
  let fixture: ComponentFixture<DetailedResponseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailedResponseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedResponseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
