import {Component, OnDestroy} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-yesno',
  templateUrl: './dialog-yesno.component.html',
  styleUrls: ['./dialog-yesno.component.css']
})
export class DialogYesnoComponent implements OnDestroy {
  ret = false;

  constructor(public dialogRef: MatDialogRef<DialogYesnoComponent>) {
  }

  onClose() {
    this.ret = true;
  }

  ngOnDestroy(): void {
    this.dialogRef.close(this.ret);
  }
}
