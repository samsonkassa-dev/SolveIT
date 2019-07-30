import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Auth/services/auth.service';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent implements OnInit {

  public selected = 'projects';

  constructor(public authService: AuthService, public service: ProjectService) { }

  ngOnInit() {
  }

  toggleView(view) {
    this.selected = view;
  }

  getRecommendations() {
    this.service.getRecommendations();
  }

}
