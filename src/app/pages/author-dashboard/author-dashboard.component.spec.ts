import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorDashboardComponent } from './author-dashboard.component';

describe('AuthorDashboardComponent', () => {
  let component: AuthorDashboardComponent;
  let fixture: ComponentFixture<AuthorDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
