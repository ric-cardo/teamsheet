/* tslint:disable:no-unused-variable */
import { NO_ERRORS_SCHEMA } from '@angular/core/';
import { TestBed, async, tick, } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { Observable } from 'rxjs/Rx';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { FixtureService, FixtureFormComponent } from './fixtures';
import { ConfirmComponent } from './confirm';

class  FixtureServiceStub {
    _fixtures = [ 
      {$key:1, opponent:'team1', date:'sat 14 jan'},
      {$key:2, opponent:'team2', date:'sat 21 jan'}
    ];
    subject = new BehaviorSubject(this._fixtures);
    fixtures = this.subject.asObservable();

    add(fixture){
      this._fixtures.push(fixture);
      this.subject.next(this._fixtures);
    }

    delete($key){
      this._fixtures = this._fixtures.filter(f => f.$key !== $key);
      this.subject.next(this._fixtures);
    }

    update(fixture){
      this._fixtures.forEach(f => {
        if(f.$key === fixture.$key){
          return Object.assign(f,fixture);
        }

        return fixture;
        
      });
      this.subject.next(this._fixtures);
    }
    
}

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        FixtureFormComponent,
        ConfirmComponent
      ],
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
      ],
      providers: [{ provide: FixtureService, useClass: FixtureServiceStub }],
      schemas:[NO_ERRORS_SCHEMA],
    })

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

  it('addFixture() should add new fixture to list ', async(() => {
      let app = TestBed.createComponent(AppComponent);
      let component = app.debugElement.componentInstance;
      let fixtures;

      component.ngOnInit();

      component.fixtures$
        .subscribe(fixtures =>{
          expect(fixtures.length).toBe(2);
        })
        .unsubscribe(); 

      component.addFixture({opponent:'team3', date:'sat 14 jan'});
      app.detectChanges();
  
      component.fixtures$.subscribe(fixtures =>{
        expect(fixtures.length).toBe(3);
        expect(fixtures[2].opponent).toBe('team3');
        expect(fixtures[2].date).toBe('sat 14 jan');
      })   
  }));

  it('deleteFixture() should delete a fixture from the list when confirmation confirmed ', async(() => {
    let app = TestBed.createComponent(AppComponent);
    let component = app.debugElement.componentInstance;
    let fixtures;
    
    spyOn(component.dialog,'open').and.returnValue(
      {afterClosed:() => Observable.of(ConfirmComponent.OK)}
    )
    
    component.ngOnInit();

    component.fixtures$
      .subscribe(fixtures =>{
        expect(fixtures.length).toBe(2);
      })
      .unsubscribe(); 

    component.deleteFixture({$key:1, opponent:'team1', date:'sat 14 jan'});
    app.detectChanges();

    component.fixtures$.subscribe(fixtures =>{
      expect(fixtures.length).toBe(1);
      expect(fixtures[0].opponent).toBe('team2');
      expect(fixtures[0].date).toBe('sat 21 jan');
    })   
  }));

  it('deleteFixture() should not delete a fixture from the list when confirmation cancelled ', async(() => {
    let app = TestBed.createComponent(AppComponent);
    let component = app.debugElement.componentInstance;
    let fixtures;
    
    spyOn(component.dialog,'open').and.returnValue(
      {afterClosed:() => Observable.of(ConfirmComponent.CANCEL)}
    )
    
    component.ngOnInit();

    component.fixtures$
      .subscribe(fixtures =>{
        expect(fixtures.length).toBe(2);
      })
      .unsubscribe(); 

    component.deleteFixture({$key:1, opponent:'team1', date:'sat 14 jan'});
    app.detectChanges();

    component.fixtures$.subscribe(fixtures =>{
      expect(fixtures.length).toBe(2);
    })   
  }));
  
  it('showfixtureForm() should render fixtureForm in dialog', () => {
    let app = TestBed.createComponent(AppComponent);
    let component = app.debugElement.componentInstance;
    spyOn(component.dialog,'open')

    component.showFixtureForm();

    expect(component.dialog.open).toHaveBeenCalledWith(
      FixtureFormComponent,
      {
        width:jasmine.any(String),
        data:jasmine.any(Object)
      }
    );
  });
    
});