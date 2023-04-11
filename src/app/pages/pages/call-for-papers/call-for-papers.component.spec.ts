import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CallForPapersComponent } from './call-for-papers.component';

describe('CallForPapersComponent', () => {
  let component: CallForPapersComponent;
  let fixture: ComponentFixture<CallForPapersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CallForPapersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CallForPapersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
