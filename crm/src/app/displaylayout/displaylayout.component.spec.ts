import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaylayoutComponent } from './displaylayout.component';

describe('DisplaylayoutComponent', () => {
  let component: DisplaylayoutComponent;
  let fixture: ComponentFixture<DisplaylayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplaylayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplaylayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
