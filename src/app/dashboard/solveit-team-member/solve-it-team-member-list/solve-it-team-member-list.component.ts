import { Router } from '@angular/router';
import { configs } from './../../../app.config';
import { Component, OnInit } from '@angular/core';
import { SolveItTeamMemberService } from '../solveit-team-member.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../Auth/services/auth.service';
import { SharedService } from '../../../shared/services/shared.service';
@Component({
  selector: 'app-solve-it-team-member-list',
  templateUrl: './solve-it-team-member-list.component.html',
  styleUrls: ['./solve-it-team-member-list.component.css']
})
export class SolveItTeamMemberListComponent implements OnInit {

  teamMembers;
  public backUpteamMembers = [];
  public key = '';
  public solveItTeamMemberForm: FormGroup;
  public editSolveItTeamMemberForm: FormGroup;
  public solveItTeamMember = { name: '', regionId: 0 };
  public page = 1;
  public regions = [];

  constructor(public router:Router,public service: SolveItTeamMemberService, public fb: FormBuilder, public authService: AuthService, public sharedService: SharedService) {
  }

  ngOnInit() {
    this.getTeamMembers();
    this.solveItTeamMemberForm = this.fb.group({
      id: ['', Validators.required],
      fullName: ['', Validators.required],
      position: ['', Validators.required],
      linklden_link: [''],
      twitter_link: ['']
    })
  }

  onSearch($event) {
    if (this.key !== '' && this.backUpteamMembers.length > 0) {
      this.teamMembers = this.backUpteamMembers.filter(item => item.name.toUpperCase().indexOf(this.key.toUpperCase()) !== -1);
    } else if (this.key === '') {
      this.teamMembers = this.backUpteamMembers;
    }
  }

  oncreateSolveItTeamMember() {
    this.service.addSolveItTeamMember(this.solveItTeamMember)
      .subscribe(res => {
        this.sharedService.addToast('Success', 'New SolveItTeamMember Added!.', 'success');
        res.region = this.regions.filter((item) => { return item.id == this.solveItTeamMember.regionId })[0];
        this.solveItTeamMemberForm.reset();
        this.teamMembers.push(res);
      }, err => {
        this.sharedService.addToast('Error', 'Error occurred!', 'error');
      });
  }

  getTeamMembers() {
    this.service.getTeamMembers()
      .subscribe(res => {
        this.teamMembers = res;
        this.backUpteamMembers = this.teamMembers;
      });
  }





  editSolveItTeamMember(solveItTeamMember) {
    this.service.updateSolveItTeamMember(solveItTeamMember)
      .subscribe(res => {
        this.editSolveItTeamMemberForm.reset()
        this.getTeamMembers()
      })
  }

  deleteSolveItTeamMember(solveItTeamMember) {
    this.service.deleteSolveItTeamMember(solveItTeamMember)
      .subscribe(res => {
        this.teamMembers.splice(this.teamMembers.indexOf(solveItTeamMember), 1);
        this.sharedService.addToast('Success', 'Deleted SolveItTeamMember Successfully!.', 'success');
      }, err => {
        this.sharedService.addToast('Error', 'Error occurred!.', 'error');
      });
  }

  getImageUrl(item) {
    return `${configs.rootUrl}storages/${item.container}/download/${item.name}`;
  }

  editMember(member){
    this.router.navigate(["dashboard","solveit-team","edit", member.id])
  }
}
