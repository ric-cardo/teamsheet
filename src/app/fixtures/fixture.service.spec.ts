/* tslint:disable:no-unused-variable */
import { TestBed, async, inject } from '@angular/core/testing';

import { FirebaseListObservable } from 'angularfire2';

import { FixtureService } from './fixture.service';

import { DBAdapter } from '../database';

class MockFirebase implements DBAdapter {
  constructor(){}
    insert(){}
    all(){
      return new FirebaseListObservable({endAt:(y)=>{}} as firebase.database.Query);
    }
    remove(key){}
    update(key,fixture){}
}
describe('FixtureService', () => {
  let service;
  let mockFirebase;

  beforeEach(() => { 
    mockFirebase = new MockFirebase();
    service = new FixtureService(mockFirebase); 
  });

  it('should exist', () => {
    expect(service).toBeTruthy();
  });

  it('should have fixture Observable', () => {
    expect(service.fixtures instanceof FirebaseListObservable).toBe(true);
  });

  
  it('should add a fixture to firebase database', () => {
    const fixture = { opponent:'team1', date:'sat 14 jan'};
    spyOn(service.db,'insert');
    
    service.add(fixture);

    expect(service.db.insert).toHaveBeenCalledWith(fixture);
  });

  it('should remove a fixture from firebase database', () => {
    const fixture = { $key:'1',opponent:'team1', date:'sat 14 jan'};
    spyOn(service.db,'remove');
    
    service.delete(fixture.$key);

    expect(service.db.remove).toHaveBeenCalledWith(fixture.$key);
  });

  it('should update a fixture in firebase database', () => {
    const fixture = { key:'1',opponent:'team1', date:'sat 14 jan'};
    spyOn(service.db,'update');
    
    service.update(fixture.key,fixture);

    expect(service.db.update).toHaveBeenCalledWith(fixture.key,fixture);
  });

  it('getPlayers should return players Observable', () => {
    const key = 1;
    const expectedRef = FixtureService.paths.fixturePlayers(key);
    let sub:any;
    spyOn(service.db,'all').and.callThrough();

    sub = service.getPlayers(key);

    expect(sub instanceof FirebaseListObservable).toBe(true);
    expect(service.db.all).toHaveBeenCalledWith(expectedRef)
  });
    
});
