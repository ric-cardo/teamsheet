import { Injectable } from '@angular/core';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

import { DBAdapter } from './database';

@Injectable()
export class FirebaseDatabase implements DBAdapter{
  constructor(private af: AngularFireDatabase){}

  all(key,query={}){
    return this.af.list(key,{query});
  }

  insert(key,data){
    this.af.list(key).push(data);
  }

  remove(key){
    this.af.list(key).remove();
  }

  update(key,id,fixture){
    this.af.list(key).update(id,fixture);
  }

  instance(){
    return this.af;
  }
}