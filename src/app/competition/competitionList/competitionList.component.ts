import { Component, Input, EventEmitter, Output } from "@angular/core";
import { CompetitionService } from "../competition.service";
import { SharedService } from "../../shared/services/shared.service";

@Component({
    selector: 'app-competition-list',
    templateUrl: './competitionList.component.html',
    styleUrls: ['competitionList.component.css']
})

export class CompetitionListComponent {

    public competitions = [
        {
            'name': 'Competition Name',
            'start_date': 'Aug - 12 - 2018',
        }
    ];
    public backupCompetitions = this.competitions; 
    public key = '';
    @Output() create = new EventEmitter();

    constructor(public service: CompetitionService, public sharedService: SharedService) {
        
    }

    getCompetitions() {
        // this.service.getCompetitions().subscribe(
        //     res => {
        //         this.competitions = res;
        //     }
        // )
    }

    viewCompetition(competition) {
        //
    }

    activateCompetition(competition) {
        let updatedCompetition = competition;
        updatedCompetition.active = true;
        this.service.activateDeactivateCompetition(updatedCompetition).subscribe(
            res => {
                this.sharedService.addToast("Success", "Competition Deactivated!.", 'success');
                competition.active = true;
            },
            err => {
                if (err.status = 422) {
                    this.sharedService.addToast("", "Error occured!", 'error');
                }
            }
        );
    }

    deactivateCompetition(competition) {
        let updatedCompetition = competition;
        updatedCompetition.active = false;
        this.service.activateDeactivateCompetition(updatedCompetition).subscribe(
            res => {
                this.sharedService.addToast("Success", "Competition Deactivated!.", 'success');
                competition.active = false;
            },
            err => {
                if (err.status = 422) {
                    this.sharedService.addToast("", "Error occured!", 'error');
                }
            }
        );
    }

    createCompetition() {
        this.create.emit();
        console.log('Emiting create event');
    }

    onSearch() {
        if(this.key !== '') {
            this.competitions = this.competitions.filter(item => {
                return item.name.toLocaleLowerCase().indexOf(this.key.toLocaleLowerCase()) != -1;
            })
        } else {
            this.competitions = this.backupCompetitions;
        }
    }
}