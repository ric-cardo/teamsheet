/* tslint:disable:no-unused-variable */
import { NO_ERRORS_SCHEMA } from '@angular/core/';
import { TestBed, async, tick,fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { AppComponent } from './app.component';
import { FixtureService } from './fixtures/fixture.service';

class  FixtureServiceStub {
    _fixtures = [ 
      {opponent:'team1', date:'sat 14 jan'},
      {opponent:'team2', date:'sat 21 jan'}
    ];
    subject = new BehaviorSubject(this._fixtures);
    fixtures = this.subject.asObservable();
}

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
      ],
      providers: [{ provide: FixtureService, useClass: FixtureServiceStub }],
      schemas:[NO_ERRORS_SCHEMA],
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('ngOnInit() should subscribe to fixtures', async(() => {
    let app = TestBed.createComponent(AppComponent);
    let component = app.debugElement.componentInstance;
    let fixtures;

    component.ngOnInit();
    component.fixtures$.subscribe(fixtures =>{
       expect(fixtures.length).toBe(2);
       expect(fixtures[0].opponent).toBe('team1');
       expect(fixtures[0].date).toBe('sat 14 jan');
    })
   
  }))
});
