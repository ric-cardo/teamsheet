import { Injectable } from '@angular/core';

import { Database } from '../database';

@Injectable()
export class FixtureService {
  fixtures

  static paths = {
    fixtures:() =>"/fixtures",
    fixturePlayers:(key) => `/fixturePlayers/${key}`
  }

  constructor(private db: Database) {
    this.fixtures = this.db.all(FixtureService.paths.fixtures());
  }
  
  add(fixture){
    this.fixtures.push(fixture);
  }

  delete(key){
    this.fixtures.remove(key);
  }

  update(key,fixture){
    this.fixtures.update(key,fixture);
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
