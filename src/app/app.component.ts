import { Component, OnInit } from '@angular/core';

import { FixtureService } from './fixtures/fixture.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  fixtures$;

  constructor(public fixtureService: FixtureService){}

  ngOnInit(){
    this.fixtures$ = this.fixtureService.fixtures;
  }
}
