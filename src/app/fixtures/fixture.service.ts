import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class FixtureService {
  fixtures 
  static paths = {
    fixtures:() =>"/fixtures",
    fixturePlayers:(key) => `/fixturePlayers/${key}`
  }
  constructor(private af: AngularFire) {
    this.fixtures = this.af.database.list(FixtureService.paths.fixtures()) as FirebaseListObservable<any[]>;
  }

  add(fixture){
    this.fixtures.push(fixture);
  }

  delete(fixture){
    this.fixtures.remove(fixture.key);
  }

  update(fixture){
    this.fixtures.update(fixture.key,fixture);
  }

  getPlayers(key){
    return this.af.database.list(FixtureService.paths.fixturePlayers(key)) as FirebaseListObservable<any[]>;
  }
  
}
