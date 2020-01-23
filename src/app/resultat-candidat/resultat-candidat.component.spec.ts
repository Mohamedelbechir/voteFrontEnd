import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultatCandidatComponent } from './resultat-candidat.component';

describe('ResultatCandidatComponent', () => {
  let component: ResultatCandidatComponent;
  let fixture: ComponentFixture<ResultatCandidatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultatCandidatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultatCandidatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
