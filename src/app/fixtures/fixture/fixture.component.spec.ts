/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement,Component } from '@angular/core';

import { FixtureComponent, FixtureService } from '../index';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs';

import { MaterialModule } from '@angular/material';

class  FixtureServiceStub {
    _fixtures = [ 
      {id:1, opponent:'team1', date:'sat 14 jan'},
      {id:2, opponent:'team2', date:'sat 21 jan'}
    ];
    subject = new BehaviorSubject(this._fixtures);
    fixtures = this.subject.asObservable();
    players = new BehaviorSubject([]).asObservable();

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

    getPlayers(key){
      return this.players;
    }
    
}

@Component({
  template: `
    <app-fixture
      [fixture]="fixture" 
      (yes)="onYes()"
      (no)="onNo()"
      (delete)="onDelete()"
    >
    </app-fixture>`
})
class TestHostComponent {
  fixture = {
    opponent:'opponent',
    date:'saturday 7th jan'
  }
  ngOnInit(){};
  availible = null;
  deleted = null;

  onYes(){
    this.availible = true;
  }

  onNo(){
    this.availible = false;
  }

  onDelete(){
    this.deleted = true;
  }
}

describe('FixtureComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      declarations: [ FixtureComponent,TestHostComponent ],
      providers: [{ provide: FixtureService, useClass: FixtureServiceStub }],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display opponent team name', () => {
    var title = fixture.debugElement.query(By.css('md-card-title'));
    var expected = 'opponent'
    expect(title.nativeElement.textContent).toBe(expected);
  });

  it('should display date of the fixture', () => {
    var subtitle = fixture.debugElement.query(By.css('md-card-subtitle'));
    var expected = 'saturday 7th jan';
    expect(subtitle.nativeElement.textContent).toBe(expected);
  });

  it('should raise a yes event when yes button clicked', () => {
    fixture
      .nativeElement
      .querySelectorAll('input')[0]
      .click();

    expect(component.availible).toBe(true);
  });

  it('should raise a no event when no button clicked', () => {
    fixture
      .nativeElement
      .querySelectorAll('input')[1]
      .click();

      expect(component.availible).toBe(false);
  });

    it('should raise a no event when no button clicked', () => {
      fixture
        .nativeElement
        .querySelector('.delete-button')
        .click();

        expect(component.deleted).toBe(true);
  });

  it('should subcribe to players subscription', () => {
    const fixComp = fixture.debugElement.query(By.css('app-fixture')).componentInstance
    fixComp.players$.subscribe(players =>{
      expect(players.length).toBe(0);
    })
  });

});
