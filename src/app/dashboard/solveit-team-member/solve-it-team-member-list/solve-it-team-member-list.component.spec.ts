import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolveItTeamMemberListComponent } from './solve-it-team-member-list.component';

describe('SolveItTeamMemberListComponent', () => {
  let component: SolveItTeamMemberListComponent;
  let fixture: ComponentFixture<SolveItTeamMemberListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolveItTeamMemberListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolveItTeamMemberListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
