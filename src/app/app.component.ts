import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import { MdDialog, MdDialogRef } from '@angular/material';
import { AngularFireAuth} from 'angularfire2/auth';

import { FixtureService, FixtureFormComponent } from './fixtures';
import { ConfirmComponent } from './confirm';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  fixtures$;
  user = undefined

  constructor(
    public dialog: MdDialog,
    public datePipe: DatePipe,
    private angularFireAuth: AngularFireAuth,
    public fixtureService: FixtureService,
  ){}

  ngOnInit(){
    this.fixtures$ = this.fixtureService.fixtures;
    this.angularFireAuth.authState.subscribe(user =>this.firebaseAuthChangeListener(user));

  }

  private firebaseAuthChangeListener(user) {
    if (user) {
      this.user =  Object.assign({},{
          name:user.displayName,
          uid:user.uid,
          image:user.photoURL
      })
    } else {
      this.user = undefined;
    }
  }

  logout(){
    this.angularFireAuth.auth.signOut();
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
