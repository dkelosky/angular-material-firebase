import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ChildrenService } from 'src/app/service/children.service';

@Component({
  selector: 'app-add-child',
  templateUrl: './add-child.component.html',
  styleUrls: ['./add-child.component.less']
})
export class AddChildComponent implements OnInit {

  ages = [];
  childForm = this.fb.group({
    name: ['', Validators.required],
    age: ['', Validators.required],
    gender: ['', Validators.required],
    important: [''],
    info: [''],
  });

  constructor(
    public dialogRef: MatDialogRef<AddChildComponent>,
    private fb: FormBuilder,
    private sb: MatSnackBar,
    private childrenService: ChildrenService,
  ) {
    for (let i = 1; i < 19; i++) {
      this.ages.push(i);
    }
  }

  ngOnInit() {
  }

  submit() {
    console.log(`Form input: ${JSON.stringify(this.childForm.value, null, 2)}`);
    this.childrenService.addChild(this.childForm.value);
    const message = `Created child ${this.childForm.value.name}!`;
    const config: MatSnackBarConfig<any> = {
      duration: 1000 * 1.5
    };
    this.dialogRef.close();
    this.sb.open(message, null, config);

  }

}
