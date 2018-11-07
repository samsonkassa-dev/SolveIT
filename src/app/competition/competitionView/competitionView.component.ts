import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CompetitionService } from '../competition.service';

declare var $: any;

@Component({
    selector: 'app-competition-view',
    templateUrl: './competitionView.component.html',
    styleUrls: ['competitionView.component.css']
})

export class CompetitionViewComponent implements OnInit {

  public competitions = [];
  public views = [
    'competitionList',
    'competitionDetail'
  ];
  public selectedCompetition = null;
  public competitionToEdit = null;

  currentView = this.views[0];

  constructor(public service: CompetitionService, public route: ActivatedRoute, public router: Router) {

  }

  ngOnInit() {
    this.getCompetitions();
  }

  getCompetitions() {
    this.service.getCompetitions().subscribe(
      res => {
        this.competitions = res;
      }
    );
  }

  toggleView(value) {
    this.currentView = this.views[value];
  }

  onCreated() {
    this.getCompetitions();
    $('#createCompetitionModal').modal('hide');
  }

  onUpdated() {
    this.getCompetitions();
    $('#editCompetition').modal('hide');
  }

  onViewCompetition($event) {
    this.selectedCompetition = $event.competition;
    this.currentView = this.views[1];
  }

  onEdit($event) {
    this.competitionToEdit = $event.competition;
    $('#editCompetition').modal('show');
  }

}
