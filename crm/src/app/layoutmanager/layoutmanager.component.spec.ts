import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutmanagerComponent } from './layoutmanager.component';

describe('LayoutmanagerComponent', () => {
  let component: LayoutmanagerComponent;
  let fixture: ComponentFixture<LayoutmanagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutmanagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutmanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
