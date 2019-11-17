import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolveItTeamMemberDisplayComponent } from './solve-it-team-member-display.component';

describe('SolveItTeamMemberDisplayComponent', () => {
  let component: SolveItTeamMemberDisplayComponent;
  let fixture: ComponentFixture<SolveItTeamMemberDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolveItTeamMemberDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolveItTeamMemberDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
