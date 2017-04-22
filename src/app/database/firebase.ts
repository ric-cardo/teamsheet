import { Injectable } from '@angular/core';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { DBAdapter } from './database';

@Injectable()
export class FirebaseDatabase implements DBAdapter{
  fixtures;
  constructor(private af: AngularFire){}

  all(path){
    return this.fixtures = this.af.database.list(path) as FirebaseListObservable<any[]>;
  }

  insert(data){
    this.fixtures.push(data);
  }

  remove(key){
    this.fixtures.remove(key);
  }

  update(key,fixture){
    this.fixtures.update(key,fixture);
  }
}