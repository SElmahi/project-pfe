import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubmitService } from '../../services/submit.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, Validators, FormGroup, AbstractControl, ValidationErrors } from '@angular/forms';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
