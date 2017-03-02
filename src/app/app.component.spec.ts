/* tslint:disable:no-unused-variable */
import { NO_ERRORS_SCHEMA } from '@angular/core/';
import { TestBed, async, tick, } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MaterialModule } from '@angular/material';


import { AppComponent } from './app.component';
import { FixtureService, FixtureFormComponent } from './fixtures';

class  FixtureServiceStub {
    _fixtures = [ 
      {id:1, opponent:'team1', date:'sat 14 jan'},
      {id:2, opponent:'team2', date:'sat 21 jan'}
    ];
    subject = new BehaviorSubject(this._fixtures);
    fixtures = this.subject.asObservable();

    add(fixture){
      this._fixtures.push(fixture);
      this.subject.next(this._fixtures);
    }

    delete(fixture){
      this._fixtures = this._fixtures.filter(f => f.id !== fixture.id);
      this.subject.next(this._fixtures);
    }

    update(fixture){
      this._fixtures.forEach(f => {
        if(f.id === fixture.id){
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
        FixtureFormComponent
      ],
      imports: [
        MaterialModule.forRoot(),
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

    it('deleteFixture() should delete a fixture from the list ', async(() => {
      let app = TestBed.createComponent(AppComponent);
      let component = app.debugElement.componentInstance;
      let fixtures;

      component.ngOnInit();

      component.fixtures$
        .subscribe(fixtures =>{
          expect(fixtures.length).toBe(2);
        })
        .unsubscribe(); 

      component.deleteFixture({id:1, opponent:'team1', date:'sat 14 jan'});
      app.detectChanges();
  
      component.fixtures$.subscribe(fixtures =>{
        expect(fixtures.length).toBe(1);
        expect(fixtures[0].opponent).toBe('team2');
        expect(fixtures[0].date).toBe('sat 21 jan');
      })   
    }));

  it('updateFixture() should update a fixture from the list ', async(() => {
    let app = TestBed.createComponent(AppComponent);
    let component = app.debugElement.componentInstance;
    let fixtures;

    component.ngOnInit();

    component.fixtures$
      .subscribe(fixtures =>{
        expect(fixtures.length).toBe(2);
        expect(fixtures[0].opponent).toBe('team1');
        expect(fixtures[0].date).toBe('sat 14 jan');
      })
      .unsubscribe(); 

    component.updateFixture({id:1, opponent:'team 3', date:'sat 22 jan'});
    app.detectChanges();

    component.fixtures$.subscribe(fixtures =>{
      expect(fixtures.length).toBe(2);
      expect(fixtures[0].opponent).toBe('team 3');
      expect(fixtures[0].date).toBe('sat 22 jan');
    })   
  }));

  
  it('showfixtureForm() should render fixtureForm in dialog', () => {
    let app = TestBed.createComponent(AppComponent);
    let component = app.debugElement.componentInstance;
    spyOn(component.dialog,'open')

    component.showFixtureForm();

    expect(component.dialog.open).toHaveBeenCalledWith(FixtureFormComponent);
  });
    
});