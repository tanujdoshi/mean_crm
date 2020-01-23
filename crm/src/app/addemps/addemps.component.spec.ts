import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddempsComponent } from './addemps.component';

describe('AddempsComponent', () => {
  let component: AddempsComponent;
  let fixture: ComponentFixture<AddempsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddempsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddempsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
