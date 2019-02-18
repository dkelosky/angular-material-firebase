import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatBottomSheet } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfirmComponent } from '../confirm/confirm.component';
import { ChildId } from 'src/app/interface/Child.interface';
import { Confirm } from 'src/app/interface/Confirm.interface';

@Component({
  selector: 'app-edit-child',
  templateUrl: './edit-child.component.html',
  styleUrls: ['./edit-child.component.less']
})
export class EditChildComponent implements OnInit {

  childForm = this.fb.group({
    // NOTE(Kelosky): regex, HTML5 pattern, or pre-canned
    age: ['', Validators.required],
    // age: ['', Validators.min(1), Validators.max(18), Validators.minLength(1), Validators.maxLength(2)],
    important: [''],
    info: [''],
  });

  constructor(
    public dialogRef: MatDialogRef<EditChildComponent>,
    private fb: FormBuilder,
    private bottomSheet: MatBottomSheet,
    @Inject(MAT_DIALOG_DATA) public child: ChildId,
  ) {
    console.log(`Got ${this.child}`);
  }

  ngOnInit() {
  }

  submit() {
    // test
    this.dialogRef.close();
  }

  cancel() {
    this.dialogRef.close();
  }

  remove() {
    console.log(`deleting`);
    const data: Confirm = {
      entity: this.child,
      ref: this.dialogRef,
      message: `Are you sure you want to remove ${this.child.name}?`,
      affirm: 'Yes',
      deny: 'Cancel',
      successMessage: `Removed entry for ${this.child.name}`,
    };
    const sheet = this.bottomSheet.open(ConfirmComponent, {
      data,
    });

  }
}
