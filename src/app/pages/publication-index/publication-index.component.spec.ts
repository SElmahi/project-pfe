import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicationIndexComponent } from './publication-index.component';

describe('PublicationIndexComponent', () => {
  let component: PublicationIndexComponent;
  let fixture: ComponentFixture<PublicationIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicationIndexComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicationIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
