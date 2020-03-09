import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';

import { AngularFireModule } from '@angular/fire';
import { AccessCodeComponent } from './access-code/access-code.component';


@NgModule({
  declarations: [
    AppComponent,
    AccessCodeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyCGN6-bLehvnQgSRdtRXKv5w75U8OHNaCo",
      authDomain: "webtest-b3c48.firebaseapp.com",
      databaseURL: "https://webtest-b3c48.firebaseio.com",
      projectId: "webtest-b3c48",
      storageBucket: "webtest-b3c48.appspot.com",
      messagingSenderId: "521374214128"
      // appId: "1:521374214128:web:9cec30f8fc8756a7b61f35",
      // measurementId: "G-F8ZK7XN1CV"
    }),
    MatCardModule,
    MatButtonModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AccessCodeComponent]
})
export class AppModule { }
