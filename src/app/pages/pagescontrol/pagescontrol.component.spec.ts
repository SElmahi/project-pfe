import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagescontrolComponent } from './pagescontrol.component';

describe('PagescontrolComponent', () => {
  let component: PagescontrolComponent;
  let fixture: ComponentFixture<PagescontrolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagescontrolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagescontrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
