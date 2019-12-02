import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { JudgeService } from './../judge.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-judge-profile',
  templateUrl: './judge-profile.component.html',
  styleUrls: ['./judge-profile.component.css']
})
export class JudgeProfileComponent implements OnInit {
  public judge:any;
  public judge_id;
  constructor(
    public judgeService: JudgeService,
    private router:Router,
    public activatedRoute : ActivatedRoute
  ) { }

  ngOnInit() {
    this.judge_id = this.activatedRoute.snapshot.paramMap.get("judge_id")
    this.judgeService.getJudge(this.judge_id)
    .subscribe(res =>{
      this.judge = res
      console.log(this.judge)
    })

  }

}
