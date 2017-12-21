import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';

import { Database } from '../database';

@Injectable()
export class FixtureService {
  fixtures: Subject<any>;

  static paths = {
    fixtures:(tid) =>`/fixtures/${tid}`,
    fixturePlayers:(key) => `/fixturePlayers/${key}`
  }

  constructor(private db: Database) {
    this.fixtures = new Subject();
  }
  
  getFixtures(teamId){
    this.db.instance().list(FixtureService.paths.fixtures(teamId), {
      query: {
        orderByChild: 'date'
      }
    })
    .subscribe((fixtures) => this.fixtures.next(fixtures))
  }

  add(teamId,fixture){
    const ref = FixtureService.paths.fixtures(teamId);
    this.db.insert(ref,fixture);
  }

  delete(teamId,fixtureKey){
    this.db.remove(
      FixtureService.paths.fixtures(teamId),
      fixtureKey
    );
  }

  update(teamId,fixtureId,data){
    this.db.update(`fixtures/${teamId}`,fixtureId,data)
  }

  getPlayers(key){
    return this.db.all(FixtureService.paths.fixturePlayers(key),{}) ;
  }

  setAvailability(user,isAvailable,fixture){
    this.db.instance()
      .object(FixtureService.paths.fixturePlayers(fixture.$key)+`/${user.uid}`)
      .update(Object.assign({},user,{isAvailable}));
    

  }
  
}
