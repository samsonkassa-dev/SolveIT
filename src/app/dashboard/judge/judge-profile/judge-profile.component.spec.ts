import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JudgeProfileComponent } from './judge-profile.component';

describe('JudgeProfileComponent', () => {
  let component: JudgeProfileComponent;
  let fixture: ComponentFixture<JudgeProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JudgeProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JudgeProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
