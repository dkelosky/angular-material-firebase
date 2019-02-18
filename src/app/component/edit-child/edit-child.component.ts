import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatBottomSheet } from '@angular/material';
import { ChildId } from 'src/app/service/children.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfirmComponent } from '../confirm/confirm.component';

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
  }

  cancel() {

  }

  delete() {
    console.log(`deleting`);
    this.bottomSheet.open(ConfirmComponent, {
      data: this.child,
    });
  }

}
