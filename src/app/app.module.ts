import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';

import { AngularFireModule } from 'angularfire2';
import { 
  AuthMethods, 
  AuthProvider, 
  FirebaseUIAuthConfig, 
  FirebaseUIModule, 
  AuthProviderWithCustomConfig 
} from 'firebaseui-angular';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Md2Module }  from 'md2';

import { environment } from '../environments/environment'
import { AppComponent } from './app.component';
import { FixtureComponent,FixtureService, FixtureFormComponent } from './fixtures';
import { Database,FirebaseDatabase } from './database';
import { ComponentsModule} from './components';
import { ConfirmComponent } from './confirm';

const firebaseUiAuthConfig: FirebaseUIAuthConfig = {
  providers: [
    AuthProvider.Google,
    AuthProvider.Password,
  ],
  method: AuthMethods.Popup,
  tos: '<your-tos-link>'
};

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
    AngularFireAuthModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
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
