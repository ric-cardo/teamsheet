import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MaterialModule } from '@angular/material';
import { AngularFireModule } from 'angularfire2';
import { FlexLayoutModule } from '@angular/flex-layout';

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
    FormsModule,
    HttpModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    FlexLayoutModule,
  ],
  providers: [FixtureService],
  bootstrap: [AppComponent],
  entryComponents:[FixtureFormComponent]
})
export class AppModule { }
