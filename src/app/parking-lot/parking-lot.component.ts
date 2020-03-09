import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import 'firebase/database';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-parking-lot',
  templateUrl: './parking-lot.component.html',
  styleUrls: ['./parking-lot.component.scss']
})
export class ParkingLotComponent implements OnInit {

  databaseRef: any;
  response: any;
  accessCode: FormControl;
  parkings: any;
  unknownParkingHide: boolean;

  constructor(public route: ActivatedRoute, private db: AngularFireDatabase, private snackbar: MatSnackBar) {
    this.accessCode = new FormControl('', Validators.required);
    this.response = null;
    this.parkings = [];
  }

  ngOnInit(): void {
    this.databaseRef = this.db.list('/');
    this.databaseRef.snapshotChanges().subscribe((action) => {
      this.response = {};
      // getting the entire db json
      for (let i = 0; i < action.length; i++) this.response[action[i]['key']] = action[i]['payload'].val();
      Object.keys(this.response).map((key) => { if (key.match(/^P[0-9]+$/)) this.parkings.push(key); });
      if (!this.parkings.includes(this.route.snapshot.paramMap.get('parking-id'))) this.unknownParkingHide = true;
    });
  }

  verifyAccessCode() {
    if (this.accessCode.value == this.response[this.route.snapshot.paramMap.get('parking-id') + '_access_code']) {
      this.databaseRef.set(this.route.snapshot.paramMap.get('parking-id'), 1).then((value) => {
        this.snackbar.open('Authentication success! You can now park your car here.', null, { duration: 2000 });
      });
    }
    else if (this.response[this.route.snapshot.paramMap.get('parking-id') + '_access_code'] == 0)
      this.snackbar.open('Uh-oh! This parking hasn\'t been booked as yet.', null, { duration: 2000 });
    else
      this.snackbar.open('Authentication failed. This parking is booked by another visitor.', null, { duration: 2000 });
  }

}
