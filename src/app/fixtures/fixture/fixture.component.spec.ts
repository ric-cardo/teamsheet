/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement,Component } from '@angular/core';

import { FixtureComponent } from './fixture.component';

import { MaterialModule } from '@angular/material';

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
      imports: [MaterialModule.forRoot()],
      declarations: [ FixtureComponent,TestHostComponent ]
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

});
