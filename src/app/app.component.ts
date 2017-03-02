import { Component, OnInit } from '@angular/core';

import { MdDialog, MdDialogRef } from '@angular/material';

import { FixtureService, FixtureFormComponent } from './fixtures';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  fixtures$;

  constructor(
    public fixtureService: FixtureService,
    public dialog: MdDialog,
  ){}

  ngOnInit(){
    this.fixtures$ = this.fixtureService.fixtures;
  }

  addFixture(fixture){
    this.fixtureService.add(fixture);
  }

  deleteFixture(fixture){
    this.fixtureService.delete(fixture);
  }

  updateFixture(fixture){
    this.fixtureService.update(fixture);
  }

  showFixtureForm(){
    this.dialog.open(FixtureFormComponent);
  }
}
