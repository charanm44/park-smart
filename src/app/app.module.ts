import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AccessCodeComponent } from './access-code/access-code.component';
import { ParkingsComponent } from './parkings/parkings.component';

// angular
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// angularfire
import { AngularFireModule } from '@angular/fire';

// angular material imports
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ParkingLotComponent } from './parking-lot/parking-lot.component';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


const routes: Routes = [
  { path: '', component: ParkingsComponent },
  { path: ':parking-id', component: ParkingLotComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    AccessCodeComponent,
    ParkingLotComponent,
    ParkingsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes, { enableTracing: true }),
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

    ReactiveFormsModule,
    FormsModule,

    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatInputModule,
    MatProgressSpinnerModule
  ],
  exports: [
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AccessCodeComponent]
})
export class AppModule { }
