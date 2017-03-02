/* tslint:disable:no-unused-variable */
import { TestBed, async, inject } from '@angular/core/testing';
import { FixtureService } from './fixture.service';

import { AngularFire, FirebaseListObservable } from 'angularfire2';

class MockFirebase{
  constructor(private firebaseConfig){}

  database ={
    list(){
      return new FirebaseListObservable();
    }
  }
}
describe('FixtureService', () => {
  let service: FixtureService;
  let mockFirebase: MockFirebase;

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
    spyOn(service.fixtures,'push');
    
    service.add(fixture);

    expect(service.fixtures.push).toHaveBeenCalledWith(fixture);
  });

  it('should remove a fixture from firebase database', () => {
    const fixture = { key:'1',opponent:'team1', date:'sat 14 jan'};
    spyOn(service.fixtures,'remove');
    
    service.delete(fixture);

    expect(service.fixtures.remove).toHaveBeenCalledWith(fixture.key);
  });

  it('should update a fixture in firebase database', () => {
    const fixture = { key:'1',opponent:'team1', date:'sat 14 jan'};
    spyOn(service.fixtures,'update');
    
    service.update(fixture);

    expect(service.fixtures.update).toHaveBeenCalledWith(fixture.key,fixture);
  });
    
});
