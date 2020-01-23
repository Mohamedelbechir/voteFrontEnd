import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthUtilisateurComponent } from './auth-utilisateur.component';

describe('AuthUtilisateurComponent', () => {
  let component: AuthUtilisateurComponent;
  let fixture: ComponentFixture<AuthUtilisateurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthUtilisateurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
