import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';

import { IMessage } from '../../_core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IMessage,
    public dialogRef: MatDialogRef<MessageComponent>
  ) {}

  ngOnInit() {
    this.data.createdAt = moment(this.data.createdAt).format('LLL');
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
