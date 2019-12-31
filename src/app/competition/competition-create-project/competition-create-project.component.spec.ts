import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetitionCreateProjectComponent } from './competition-create-project.component';

describe('CompetitionCreateProjectComponent', () => {
  let component: CompetitionCreateProjectComponent;
  let fixture: ComponentFixture<CompetitionCreateProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompetitionCreateProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetitionCreateProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
