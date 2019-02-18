import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatBottomSheet } from '@angular/material';
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
    @Inject(MAT_DIALOG_DATA) public child: ChildId,
  ) {
  }

  ngOnInit() {
  }

  submit() {
    this.dialogRef.close();
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
