import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatBottomSheet, MatSnackBarConfig, MatSnackBar } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfirmComponent } from '../confirm/confirm.component';
import { ChildId } from 'src/app/interface/child.interface';
import { Confirm } from 'src/app/interface/confirm.interface';
import { ChildrenService } from 'src/app/service/children.service';
import { ChildConstant } from 'src/app/constant/child.constant';

@Component({
  selector: 'app-edit-child',
  templateUrl: './edit-child.component.html',
  styleUrls: ['./edit-child.component.less']
})
export class EditChildComponent implements OnInit {

  ages = ChildConstant.AGE_RANGE;

  childForm = this.fb.group({
    age: ['', Validators.required],
    important: [''],
    info: [''],
  });

  constructor(
    public dialogRef: MatDialogRef<EditChildComponent>,
    private fb: FormBuilder,
    private childrenService: ChildrenService,
    private bottomSheet: MatBottomSheet,
    private sb: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public child: ChildId,
  ) {
  }

  ngOnInit() {
  }

  submit() {
    console.log(`Form input: ${JSON.stringify(this.childForm.value, null, 2)}`);

    // change values from form
    this.child.important = this.childForm.value.important;
    this.child.age = this.childForm.value.age;

    this.childrenService.setChild(this.child);
    const message = `Updated child ${this.child.name}!`;
    const config: MatSnackBarConfig = {
      duration: 1000 * 1.5
    };
    this.dialogRef.close();
    this.sb.open(message, null, config);
  }

  cancel() {
    this.dialogRef.close();
  }

  remove() {
    console.log(`Remove called for ${this.child.name}`);

    const data: Confirm = {
      entity: this.child,
      ref: this.dialogRef,
      message: `Are you sure you want to remove ${this.child.name}?`,
      affirm: 'Yes',
      deny: 'Cancel',
      affirmAction: () => {
        this.childrenService.deleteChild(this.child);
      },
      successMessage: `Removed entry for ${this.child.name}`,
    };

    this.bottomSheet.open(ConfirmComponent, {
      data,
    });
  }

}
