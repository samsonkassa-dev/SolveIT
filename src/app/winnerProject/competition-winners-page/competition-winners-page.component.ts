import { Component, OnInit } from '@angular/core';
import { WinnerProjectService } from '../winnerProject.service';
import { CommonService } from '../../shared/services/common.service';
import { configs } from '../../app.config';
import { AuthService } from '../../Auth/services/auth.service';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-competition-winners-page',
  templateUrl: './competition-winners-page.component.html',
  styleUrls: ['./competition-winners-page.component.css']
})
export class CompetitionWinnersPageComponent implements OnInit {
  public competitionWinner = { title: "", description: "", solveitproject: null, thumbinal: "" };
  public competitionWinners = [];
  public cities = [];
  public competitions = [];
  public catagorizedWinnersList = [];
  public filteredWinners = [];
  public filterKeyWord = '';
  rankConversion = {
    "Gold": "First",
    "Silver": "Second",
    "Bronze": "Third",
    "Honorable-Mentions": "Special Recognition"
  }
  constructor(private service: WinnerProjectService, private commonService: CommonService,
    private authService: AuthService, private router: Router) { }

  ngOnInit() {
    setTimeout(this.check, 1000)
    $(window).scroll(this.check);
    if (this.authService.isAdmin() || this.authService.isSolveitManager() || this.authService.isSolveitTeam()) {
      this.router.navigate(['winners/admin']);
    } else {
      
    }
    this.fetchParams();
  }

  i = 0;
  check(){
    
    var txt = 'Interested in working with these projects?';
    var speed = 50;

    function typeWriter() {
 
      var i = document.getElementById("initiative").innerHTML.length || 0
      if (i-1 < txt.length) {
        document.getElementById("initiative").innerHTML += txt.charAt(i-1);
        i++;
        setTimeout(typeWriter, speed);
      }
    }
    if ($('#initiative').offset() != undefined) {
      var hT = $('#initiative').offset().top,
        hH = $('#initiative').outerHeight(),
        wH = $(window).height(),
        wS = $(this).scrollTop();
      if (wS > (hT + hH - wH)) {
        setTimeout(typeWriter, 1000);
      }
    }
  }
  setUpViewWinners(winner) {
    //console.log(winner)
    this.competitionWinner = winner
  }


  fetchParams() {
    const cities = this.commonService.getCities();
    const competitions = this.commonService.getCompetitions();
    const competitionWinners = this.service.getCompetitionWinners();

    Promise.all([cities, competitions, competitionWinners])
      .then(res => {
        res[0].subscribe(citiesRes => {
          this.cities = citiesRes;
          res[1].subscribe(competitionsRes => {
            this.competitions = competitionsRes;
            res[2].subscribe(winnersRes => {
              this.competitionWinners = winnersRes;
              this.categorizeCompetitionWinners();
            });
          });
        });
      });
  }

  getCompetitionWinners() {
    this.service.getCompetitionWinners().subscribe(res => {
      this.competitionWinners = res;
    });
  }

  categorizeCompetitionWinners() {
    this.competitions.forEach(competition => {
      const temp = { name: competition.name, winners: [] };
      this.cities.forEach(city => {
        const temp1 = { name: city.name, winners: [] };
        this.competitionWinners.forEach(winner => {
          if (winner.competitionId === competition.id && winner.city === city.id) {
            temp1['winners'].push(winner);
          }
        });
        if (temp1.winners.length > 0) { temp['winners'].push(temp1); }
      });
      if (temp.winners.length > 0) { this.catagorizedWinnersList.push(temp); }
    });
    this.filteredWinners = this.catagorizedWinnersList;
  }

  getImageUrl(item) {
    return `${configs.rootUrl}storages/${item.container}/download/${item.name}`;
  }

  filter($event) {
    if (this.filterKeyWord !== '') {
      this.filteredWinners = this.catagorizedWinnersList.filter(competition => {
        return competition.name === this.filterKeyWord;
      });
    } else {
      this.filteredWinners = this.catagorizedWinnersList;
    }
  }

  getProjectTitle(title) {
    return title.length < 28 ? `<h6 class="title">${title}</h6>` + '<br>' : `<h6 class="title">${title}</h6>`;
  }

}
