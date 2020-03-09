import { Component, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import 'firebase/database';
import { MatDialog } from '@angular/material/dialog';
import { AccessCodeComponent } from './access-code/access-code.component';
import { withModule } from '@angular/core/testing';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'park-smart';
  firebaseConfig: any;
  response: any;
  visitedInts: any;

  constructor(private db: AngularFireDatabase, private dialog: MatDialog) {
    this.response = null;
    this.visitedInts = [];
  }

  ngOnInit() {
    this.db.list('/').snapshotChanges().subscribe((action) => {
      let res = {};
      for (let i=0; i<action.length; i++) res[action[i]['key']] = action[i]['payload'].val();
      this.response = res;
      console.log(res);
    });
    console.log(this.getRandomInt());
  }  

  showAccessCode() {
    this.dialog.open(AccessCodeComponent, {
      data: 'HelloWorld'
    });
  }

  getRandomInt() {
    while(true) {
      let r = Math.floor(Math.random() * (9 - 1) + 1);
      if (this.visitedInts.includes(r)) continue;
      this.visitedInts.push(r);
      return r;
    }
  }

}
