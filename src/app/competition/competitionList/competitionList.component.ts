import {Component, Input, EventEmitter, Output, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CompetitionService } from '../competition.service';
import { SharedService } from '../../shared/services/shared.service';

declare var $: any;

@Component({
    selector: 'app-competition-list',
    templateUrl: './competitionList.component.html',
    styleUrls: ['competitionList.component.css']
})

export class CompetitionListComponent implements OnInit, OnChanges {

  public key = '';
  @Input() competitions = [];
  @Input() backupCompetitions = [];
  @Output() edit = new EventEmitter();
  @Output() viewCompetition = new EventEmitter();

  constructor(public service: CompetitionService, public sharedService: SharedService,
              public route: ActivatedRoute, public router: Router) {

  }

  ngOnInit(): void {
    this.competitions = this.backupCompetitions;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.backupCompetitions = changes.backupCompetitions.currentValue;
    this.competitions = this.backupCompetitions;
  }

  activateCompetition(competition) {
      const updatedCompetition = competition;
      updatedCompetition.active = true;
      this.service.activateDeactivateCompetition(updatedCompetition).subscribe(
          res => {
              this.sharedService.addToast('Success', 'Competition Deactivated!.', 'success');
              competition.active = true;
          },
          err => {
              if (err.status = 422) {
                  this.sharedService.addToast('', 'Error occured!', 'error');
              }
          }
      );
  }

  deactivateCompetition(competition) {
      const updatedCompetition = competition;
      updatedCompetition.active = false;
      this.service.activateDeactivateCompetition(updatedCompetition).subscribe(
          res => {
              this.sharedService.addToast('Success', 'Competition Deactivated!.', 'success');
              competition.active = false;
          },
          err => {
              if (err.status = 422) {
                  this.sharedService.addToast('', 'Error occured!', 'error');
              }
          }
      );
  }

  viewProjects(competition) {
      this.router.navigate(['/competition', competition.id]);
  }

  onSearch() {
      if (this.key !== '') {
          this.competitions = this.backupCompetitions.filter(item => {
              return item.name.toLocaleLowerCase().indexOf(this.key.toLocaleLowerCase()) !== -1;
          });
      } else {
          this.competitions = this.backupCompetitions;
      }
  }

  onViewDetail(competition) {
    this.viewCompetition.emit({competition: competition});
  }

  onEdit(competition) {
    this.edit.emit({competition: competition});
  }

}
