import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-access-code',
  templateUrl: './access-code.component.html',
  styleUrls: ['./access-code.component.scss']
})
export class AccessCodeComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data) { }

}
