import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanifierElectionComponent } from './planifier-election.component';

describe('PlanifierElectionComponent', () => {
  let component: PlanifierElectionComponent;
  let fixture: ComponentFixture<PlanifierElectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanifierElectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanifierElectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
