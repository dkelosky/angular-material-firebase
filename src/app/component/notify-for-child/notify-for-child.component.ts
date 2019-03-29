import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatSnackBarConfig, MatSnackBar } from '@angular/material';
import { ChildId } from 'src/app/interface/child.interface';
import { ChildrenService } from 'src/app/service/children.service';
import { functions } from 'firebase';

@Component({
  selector: 'app-notify-for-child',
  templateUrl: './notify-for-child.component.html',
  styleUrls: ['./notify-for-child.component.less']
})
export class NotifyForChildComponent implements OnInit {

  childForm = this.fb.group({
    message: ['', Validators.required],
  });

  constructor(
    public dialogRef: MatDialogRef<NotifyForChildComponent>,
    private fb: FormBuilder,
    private sb: MatSnackBar,
    private childrenService: ChildrenService,
    @Inject(MAT_DIALOG_DATA) public child: ChildId,
  ) { }

  ngOnInit() {
  }

  async submit() {
    console.log(`Form input: ${JSON.stringify(this.childForm.value, null, 2)}`);
    console.log(`parent: ${this.childrenService.getChildRef(this.child).parent.parent.id}`);

    const notifyParent = functions().httpsCallable('notifyParent');

    try {
      await notifyParent({
        user: this.childrenService.getChildRef(this.child).parent.parent.id,
        child: this.child.id,
        message: this.childForm.value.message,
      });
    } catch (err) {
      console.error(`Notify failure`);
      console.error(err);
    }

    const message = `Sent message for ${this.child.name}!`;
    const config: MatSnackBarConfig = {
      duration: 1000 * 1.5
    };
    this.dialogRef.close();
    this.sb.open(message, null, config);
  }

  cancel() {
    this.dialogRef.close();
  }
}
