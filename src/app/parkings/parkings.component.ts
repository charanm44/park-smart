import { Component, OnInit } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccessCodeComponent } from '../access-code/access-code.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-parkings',
  templateUrl: './parkings.component.html',
  styleUrls: ['./parkings.component.scss']
})
export class ParkingsComponent implements OnInit {

  timeout = 20000;

  firebaseConfig: any;
  databaseRef: AngularFireList<unknown>;
  response: any;
  parkings: any;
  visitedInts: any;
  accessCodes: any;
  currentParking: string;

  constructor(private db: AngularFireDatabase, private dialog: MatDialog, private snackbar: MatSnackBar, private route: ActivatedRoute) {
    this.response = null;
    this.visitedInts = [];
    this.parkings = [];
    this.currentParking = 'P1';
  }

  ngOnInit() {
    this.databaseRef = this.db.list('/');
    this.databaseRef.snapshotChanges().subscribe((action) => {
      this.response = {};
      this.parkings = [];
      // getting the entire db json
      for (let i=0; i<action.length; i++) this.response[action[i]['key']] = action[i]['payload'].val();
      // getting parkings from json
      Object.keys(this.response).map((key) => { if (key.match(/^P[0-9]+$/)) this.parkings.push(key); });
    });
  }  

  showAccessCode(parking) {
    this.currentParking = parking;
    let accessCode;
    while (true) {
      accessCode = this.generateAccessCode();
      this.accessCodes = this.response['access_codes'] == null ? [] : this.response['access_codes'];
      if (!this.accessCodes.includes(this.accessCodes)) {
        this.accessCodes.push(accessCode);
        break;
      }
    }
    this.databaseRef.set('access_codes', this.accessCodes).then((value) => {  // push a new access code
      this.databaseRef.set(this.currentParking + '_access_code', accessCode).then((value) => {  // set that new access code to the currentParking
        this.dialog.open(AccessCodeComponent, {
          data: accessCode
        });
        setTimeout(this.clearCodes.bind(this, parking), this.timeout);
      });
    });
  }

  generateAccessCode() {
    let accessString = '';
    for (let i in [0,0,0,0])
      accessString += this.getRandomInt();
    this.visitedInts = [];
    return parseInt(accessString);
  }

  getRandomInt() {
    while(true) {
      let r = Math.floor(Math.random() * (9 - 1) + 1);
      if (this.visitedInts.includes(r)) continue;
      this.visitedInts.push(r);
      return r;
    }
  }

  clearCodes(parking) {
    this.databaseRef.set(parking, 0).then((value) => {
      delete this.accessCodes[this.accessCodes.indexOf(this.response[parking + '_access_code'])]
      this.databaseRef.set('access_codes', this.accessCodes).then((value) => {
        this.databaseRef.set(parking + '_access_code', 0).then((value) => {
          this.snackbar.open(`Alotted time for ${parking} has expired.`, null, { duration: 2000 });
        });
      });
    });
  }

  // whatsTheStatus(parking) {
  //   return (this.response[parking] == 0 && this.response.[parking + '_access_code'] == 0) ? 'Vacant' : (this.response.[parking] == 0 && this.response.[parking + '_access_code'] != 0) ? 'Booked' : 'Occupied'
  // }

}
