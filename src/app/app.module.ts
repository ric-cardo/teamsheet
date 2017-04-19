import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { MaterialModule } from '@angular/material';
import { AngularFireModule } from 'angularfire2';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Md2Module }  from 'md2';

import { environment } from '../environments/environment'
import { AppComponent } from './app.component';
import { FixtureComponent,FixtureService, FixtureFormComponent } from './fixtures';

@NgModule({
  declarations: [
    AppComponent,
    FixtureComponent,
    FixtureFormComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    FlexLayoutModule,
    Md2Module.forRoot(),
  ],
  providers: [FixtureService],
  bootstrap: [AppComponent],
  entryComponents:[FixtureFormComponent]
})
export class AppModule { }
