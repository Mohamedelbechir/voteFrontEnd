import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IsieComponent } from './isie.component';

describe('IsieComponent', () => {
  let component: IsieComponent;
  let fixture: ComponentFixture<IsieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IsieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IsieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
