import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';

import { FixtureService } from '../fixture.service';

@Component({
  selector: 'app-fixture',
  templateUrl: './fixture.component.html',
  styleUrls: ['./fixture.component.scss']
})
export class FixtureComponent implements OnInit {
  @Input() fixture;
  @Input() team;
  @Input() user;
 
  @Output() yes = new EventEmitter();
  @Output() no = new EventEmitter();
  @Output() delete = new EventEmitter();
  @Output() edit = new EventEmitter();

  availability;
  players = {
    available:[],
    unavailable:[]
  }
  isAvailable;
  hasAnswered;
  homeTeam;
  awayTeam;

  constructor(private fixtureService:FixtureService) { }

  ngOnInit() {
    this.fixtureService.getPlayers(this.fixture.$key)
      .subscribe((players:Array<any>)=>{
        this.players.available = players.filter( p => p.isAvailable)
        this.players.unavailable = players.filter(p => !p.isAvailable)
        this.getAvailability(players);
        
      })
  }

  ngOnChanges(changes) {
    if(!changes.fixture){return};
    const {ground} = changes.fixture.currentValue

    if(ground === 'home'){
      this.homeTeam = this.team.name
      this.awayTeam = this.fixture.opponent
    }

    if(ground === 'away'){
      this.awayTeam = this.team.name
      this.homeTeam = this.fixture.opponent
    }
  }

  setAvailability(isAvailable){
      this.fixtureService.setAvailability(this.user,isAvailable,this.fixture)
  }

  getAvailability(players){
    const player = players.filter(p =>p.$key === this.user.uid).shift();
    if(player){
       this.isAvailable = player.isAvailable;
       this.hasAnswered = true;
    }
    else{
      this.isAvailable = false;
      this.hasAnswered = false;
    }
  }

}
