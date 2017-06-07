import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import { MdDialog, MdDialogRef } from '@angular/material';

import { FixtureService, FixtureFormComponent } from './fixtures';
import { ConfirmComponent } from './confirm';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  fixtures$;

  constructor(
    public fixtureService: FixtureService,
    public dialog: MdDialog,
    public datePipe: DatePipe
  ){}

  ngOnInit(){
    this.fixtures$ = this.fixtureService.fixtures;
  }

  addFixture(fixture){
    this.fixtureService.add(fixture);
  }

  deleteFixture(fixture){
    this.dialog.open(ConfirmComponent,{
      width:'80%',
      data:{
        title:'delete fixture',
        content: `${fixture.opponent} ${this.datePipe.transform(fixture.date, 'yyyy-MM-dd')}`,
        buttons:{ok:'delete'}
      }
    })
    .afterClosed()
    .filter(res => res === ConfirmComponent.OK)
    .subscribe(() => this.fixtureService.delete(fixture.$key))
  }

  showFixtureForm(fixture ={}){
    const ref =this.dialog.open(FixtureFormComponent,{
      width:'80%',
      data:fixture
    })

  }
}
