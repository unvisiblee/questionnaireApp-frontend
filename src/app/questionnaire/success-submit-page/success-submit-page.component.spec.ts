import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessSubmitPageComponent } from './success-submit-page.component';

describe('SuccessSubmitPageComponent', () => {
  let component: SuccessSubmitPageComponent;
  let fixture: ComponentFixture<SuccessSubmitPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessSubmitPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessSubmitPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
