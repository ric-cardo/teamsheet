import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Http,Headers } from '@angular/http';

import { MdDialog, MdDialogRef } from '@angular/material';
import { AngularFireAuth} from 'angularfire2/auth';
import * as closestIndexTo from 'date-fns/closest_index_to';

import { environment } from '../environments/environment';
import { FixtureService, FixtureFormComponent } from './fixtures';
import { ConfirmComponent } from './confirm';

import { Database } from './database';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  fixtures$;
  user = undefined
  selectedTabIndex;
  teams$ =[];
  hasTeam;
  teamId;
  hasJoinedNewTeam = false;

  constructor(
    public dialog: MdDialog,
    public datePipe: DatePipe,
    private angularFireAuth: AngularFireAuth,
    public fixtureService: FixtureService,
    private db: Database,
    private http:Http
  ){}

  ngOnInit(){
    this.fixtures$ = this.fixtureService.fixtures.do(fixtures =>{
      // prevent expression error
      setTimeout(_ =>{
        const now = new Date();
        const dates = fixtures.map(fixture => fixture.date);
        this.selectedTabIndex = closestIndexTo(now,dates);
      },0)
     
    })
    this.angularFireAuth.authState.subscribe(user =>this.firebaseAuthChangeListener(user));
  
  }

  private firebaseAuthChangeListener(user) {
    if (user) {
      this.user =  Object.assign({},{
          name:user.displayName,
          uid:user.uid,
          image:user.photoURL,
      })
      this.teams$ = this.db.instance()
      .list(`/users/${this.user.uid}/teams`, {
        query: {
          orderByChild: 'name'
        }
      })
      .do( res=>{
        this.hasTeam = !!res.length
        if(this.hasTeam){
          const teamId = this.hasJoinedNewTeam ? res.length -1 : 0
          this.switchTeam(res[teamId].id)
          this.teamId = res[teamId].id
        }
        this.hasJoinedNewTeam = false;
      })
    } else {
      this.user = undefined;
    }
  }

  joinTeam(code){
    const url = `${environment.firebase.functions}/join`
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json;charset=utf-8');
    
    this.hasJoinedNewTeam = true;
    this.http.post(url,JSON.stringify({
      code,
      uid:this.user.uid
    }),{
      headers
    })
    .map(res => res.json())
    .subscribe(null,(res: any) => {
      if (res.status === 422) {
          const {error} = res.json();
          this.dialog.open(ConfirmComponent,{
            data:{
              title:error.message,
            }
          })
          return Observable.throw(new Error(res.status));
      }
    })
  }

  logout(){
    this.angularFireAuth.auth.signOut();
  }

  deleteFixture(teamId,fixture){
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
    .subscribe(() => this.fixtureService.delete(teamId,fixture.$key))
  }

  showFixtureForm(teamId,fixture ={}){
    const ref =this.dialog.open(FixtureFormComponent,{
      width:'80%',
      data:{fixture,teamId}
      
    })
  }

  switchTeam(teamId){
    this.hasTeam = true;
    this.selectedTabIndex = 0;
    this.fixtureService.getFixtures(teamId) 
  }

  showJoinForm(){
    this.hasTeam = false;
  }

  trackByFn(index, item) { return item.$key; }
}
