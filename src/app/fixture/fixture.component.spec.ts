/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement,Component } from '@angular/core';

import { FixtureComponent } from './fixture.component';

import { MaterialModule } from '@angular/material';

@Component({
  template: `
    <app-fixture
      [opponent]="opponent" 
      [date]=date
    >
    </app-fixture>`
})
class TestHostComponent {
  opponent = 'opponent';
  date = 'saturday 7th jan';
}

fdescribe('FixtureComponent', () => {
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
});
