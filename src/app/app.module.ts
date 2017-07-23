import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { FlexLayoutModule } from '@angular/flex-layout';
import { Md2Module }  from 'md2';

import { environment } from '../environments/environment'
import { AppComponent } from './app.component';
import { FixtureComponent,FixtureService, FixtureFormComponent } from './fixtures';
import { Database,FirebaseDatabase } from './database';
import { ComponentsModule} from './components';
import { ConfirmComponent } from './confirm';

@NgModule({
  declarations: [
    AppComponent,
    FixtureComponent,
    FixtureFormComponent,
    ConfirmComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    ComponentsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    FlexLayoutModule,
    Md2Module.forRoot(),
  ],
  providers: [
    { provide: Database, useClass: FirebaseDatabase },
    FixtureService,
    DatePipe
  ],
  bootstrap: [AppComponent],
  entryComponents:[
    FixtureFormComponent,
    ConfirmComponent,
  ]
})
export class AppModule { }
