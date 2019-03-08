import { Component, OnInit, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { Confirm } from 'src/app/interface/confirm.interface';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.less']
})
export class ConfirmComponent implements OnInit {

  // default messages
  affirm = 'OK';
  deny = 'Cancel';
  message = 'Are you sure?';

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) private data: Confirm,
    private bottomSheetRef: MatBottomSheetRef<Component>,
    private snackbarService: MatSnackBar,
  ) {

    if (this.data.affirm) {
      this.affirm = this.data.affirm;
    }
    if (this.data.deny) {
      this.deny = this.data.deny;
    }
    if (this.data.message) {
      this.message = this.data.message;
    }
  }

  ngOnInit() {
  }

  denied() {
    console.log(`Denied ${this.data.entity.name}`);

    if (this.data.denyAction) {
      this.data.denyAction();
    }

    this.bottomSheetRef.dismiss();
  }

  affirmed() {
    console.log(`Affirmed ${(this.data.entity.name)}`);

    if (this.data.affirmAction) {
      this.data.affirmAction();
    }

    // if success message, show after the bottom sheet disappears
    if (this.data.successMessage) {
      this.bottomSheetRef.afterDismissed().subscribe(() => {
        const config: MatSnackBarConfig = {
          duration: 1000 * 1.5
        };
        this.snackbarService.open(this.data.successMessage, null, config);
      });
    }

    // close sheet and dialogg
    this.bottomSheetRef.dismiss();

    if (this.data.ref) {
      this.data.ref.close();
    }
  }
}
