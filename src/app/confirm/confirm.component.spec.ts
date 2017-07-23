import { asNativeElements } from '@angular/core/core';
import { MaterialModule,MdDialogRef,MD_DIALOG_DATA } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core/';
import { ConfirmComponent } from './confirm.component';

describe('ConfirmComponent', () => {
  let component: ConfirmComponent;
  let fixture: ComponentFixture<ConfirmComponent>
  let el;
  let dialogData = {
    title:'TITLE_GOES_HERE',
    content:"CONTENT_GOES_HERE",
    buttons:{}
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmComponent ],
      imports:[BrowserAnimationsModule,MaterialModule],
      providers:[
        { provide: MdDialogRef, useValue: {} },
        { provide: MD_DIALOG_DATA, useValue: dialogData} ],
      schemas:[NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmComponent);
    component = fixture.componentInstance;
    el = fixture.nativeElement;
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a configurable title',()=>{
    fixture.detectChanges();
    const actual = el.querySelector('[md-dialog-title]').textContent;
    const expected = 'TITLE_GOES_HERE';

    expect(expected).toBe(actual);
  })

  it('should display a configurable content',()=>{
    fixture.detectChanges();
    const actual = el.querySelector('[md-dialog-content]').textContent;
    const expected = 'CONTENT_GOES_HERE';

    expect(expected).toBe(actual);
  })

  it('should display default ok button label',()=>{
    fixture.detectChanges();
    const actual = el.querySelector('[ok-button]').textContent;
    const expected = 'ok';

    expect(expected).toBe(actual);
  })

  it('should display configurable ok button label',()=>{
    component.dialogData.buttons.ok = 'CUSTOM_LABEL';
    fixture.detectChanges();
    const actual = el.querySelector('[ok-button]').textContent;
    const expected = 'CUSTOM_LABEL';

    expect(expected).toBe(actual);
  })

  it('should display defult cancel button label',()=>{
    fixture.detectChanges();
    const actual = el.querySelector('[cancel-button]').textContent;
    const expected = 'cancel';
    expect(expected).toBe(actual);
  })

  it('should display configurable cancel button label',()=>{
    component.dialogData.buttons.cancel = 'CUSTOM_LABEL';
    fixture.detectChanges();
    const actual = el.querySelector('[cancel-button]').textContent;
    const expected = 'CUSTOM_LABEL';
    expect(expected).toBe(actual);
  })
});
