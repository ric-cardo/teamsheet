import { Injectable } from '@angular/core';


import {
  AfoListObservable,
  AfoObjectObservable,
  AngularFireOfflineDatabase } from 'angularfire2-offline/database';
import { DBAdapter } from './database';

@Injectable()
export class FirebaseDatabase implements DBAdapter{
  constructor(private af: AngularFireOfflineDatabase){}

  all(key,query={}){
    return this.af.list(key,{query});
  }

  insert(key,data){
    this.af.list(key).push(data);
  }

  remove(ref,key){
    this.af.list(ref).remove(key);
  }

  update(key,id,fixture){
    this.af.list(key).update(id,fixture);
  }

  instance(){
    return this.af;
  }
}