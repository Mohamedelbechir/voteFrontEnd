import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatElectComponent } from './candidat-elect.component';

describe('CandidatElectComponent', () => {
  let component: CandidatElectComponent;
  let fixture: ComponentFixture<CandidatElectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidatElectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatElectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
