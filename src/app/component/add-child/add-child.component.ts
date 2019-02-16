import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ChildrenService, ChildId, Child } from 'src/app/service/children.service';

@Component({
  selector: 'app-add-child',
  templateUrl: './add-child.component.html',
  styleUrls: ['./add-child.component.less']
})
export class AddChildComponent implements OnInit {

  childForm = this.fb.group({
    name: ['', Validators.required],
    age: ['', Validators.required],
    important: [''],
    info: [''],
  });

  constructor(
    public dialogRef: MatDialogRef<AddChildComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: Child,
    private fb: FormBuilder,
    private sb: MatSnackBar,
    private chldrnSrvc: ChildrenService,
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    console.log(`Form input: ${JSON.stringify(this.childForm.value, null, 2)}`);
    this.chldrnSrvc.addChild(this.childForm.value);
    const message = `Created child ${this.childForm.value.name}!`;
    const config: MatSnackBarConfig<any> = {
      duration: 1000 * 1.5
    };
    this.dialogRef.close();
    // this.children.addChild()
    this.sb.open(message, null, config);
  }

}
