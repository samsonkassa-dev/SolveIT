import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolveItTeamMemberAddComponent } from './solve-it-team-member-add.component';

describe('SolveItTeamMemberAddComponent', () => {
  let component: SolveItTeamMemberAddComponent;
  let fixture: ComponentFixture<SolveItTeamMemberAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolveItTeamMemberAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolveItTeamMemberAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
