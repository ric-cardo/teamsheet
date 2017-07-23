import { Injectable } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { DBAdapter } from './database';

@Injectable()
export class FirebaseDatabase implements DBAdapter{
  fixtures;
  constructor(private af: AngularFireDatabase){}

  all(path){
    return this.fixtures = this.af.list(path) as FirebaseListObservable<any[]>;
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