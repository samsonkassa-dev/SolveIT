import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolveItTeamMemberEditComponent } from './solve-it-team-member-edit.component';

describe('SolveItTeamMemberEditComponent', () => {
  let component: SolveItTeamMemberEditComponent;
  let fixture: ComponentFixture<SolveItTeamMemberEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolveItTeamMemberEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolveItTeamMemberEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
