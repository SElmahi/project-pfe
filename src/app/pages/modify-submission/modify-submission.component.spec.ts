import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifySubmissionComponent } from './modify-submission.component';

describe('ModifySubmissionComponent', () => {
  let component: ModifySubmissionComponent;
  let fixture: ComponentFixture<ModifySubmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifySubmissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifySubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
