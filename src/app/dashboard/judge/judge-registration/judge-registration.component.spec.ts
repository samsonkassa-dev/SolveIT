import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JudgeRegistrationComponent } from './judge-registration.component';

describe('JudgeRegistrationComponent', () => {
  let component: JudgeRegistrationComponent;
  let fixture: ComponentFixture<JudgeRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JudgeRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JudgeRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
