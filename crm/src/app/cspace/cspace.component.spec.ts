import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CspaceComponent } from './cspace.component';

describe('CspaceComponent', () => {
  let component: CspaceComponent;
  let fixture: ComponentFixture<CspaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CspaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
