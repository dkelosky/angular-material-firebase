import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ChildrenService } from 'src/app/service/children.service';
import { ChildConstant } from 'src/app/constant/child.constant';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserId } from 'src/app/interface/user.interface';
import { UsersService } from 'src/app/service/users.service';

@Component({
  selector: 'app-add-child',
  templateUrl: './add-child.component.html',
  styleUrls: ['./add-child.component.less']
})
export class AddChildComponent implements OnInit {

  ages = ChildConstant.AGE_RANGE;
  childForm = this.fb.group({
    name: ['', Validators.required],
    gender: ['', Validators.required],
    age: ['', Validators.required],
    phone: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("\\d+")])],
    important: [''],
    info: [''],
  });

  constructor(
    public dialogRef: MatDialogRef<AddChildComponent>,
    private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private sb: MatSnackBar,
    private childrenService: ChildrenService,
    private usersService: UsersService,
    @Inject(MAT_DIALOG_DATA) public user: UserId,
  ) {
    const phone = this.afAuth.auth.currentUser.phoneNumber || this.user.phone;
    this.childForm.get('phone').setValue(phone);
  }

  ngOnInit() {
  }

  submit() {
    console.log(`Form input: ${JSON.stringify(this.childForm.value, null, 2)}`);
    if (this.afAuth.auth.currentUser.phoneNumber) {
      // do nothing
      console.log(`no phone number with account`);
    } else {
      console.log(`saving last used phone number for user: ${this.childForm.value.phone}`);
      this.user.phone = this.childForm.value.phone;
      this.usersService.setUser(this.user);
    }
    this.childrenService.addChild(this.childForm.value);
    const message = `Created child ${this.childForm.value.name}!`;
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
