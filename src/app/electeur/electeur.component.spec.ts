import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElecteurComponent } from './electeur.component';

describe('ElecteurComponent', () => {
  let component: ElecteurComponent;
  let fixture: ComponentFixture<ElecteurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElecteurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElecteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
