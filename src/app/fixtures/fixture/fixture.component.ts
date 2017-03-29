import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';

import { FixtureService } from '../fixture.service';

@Component({
  selector: 'app-fixture',
  templateUrl: './fixture.component.html',
  styleUrls: ['./fixture.component.scss']
})
export class FixtureComponent implements OnInit {
  @Input() fixture;
 
  @Output() yes = new EventEmitter();
  @Output() no = new EventEmitter();
  @Output() delete = new EventEmitter();

  availability;
  players$;

  constructor(private fixtureService:FixtureService) { }

  ngOnInit() {
    this.players$ = this.fixtureService.getPlayers(this.fixture.$key)
  }

  setAvailability(isAvailible){
    if(parseInt(isAvailible.value)){
      this.yes.emit();
    }
    else{
      this.no.emit();
    }
  }
}
