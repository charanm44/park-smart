import { Component, ViewChild } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import 'firebase/database';
import { MatDialog } from '@angular/material/dialog';
import { AccessCodeComponent } from './access-code/access-code.component';
import { withModule } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'park-smart';

}
