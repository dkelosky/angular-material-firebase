import { Component, OnInit, Inject } from '@angular/core';
import { ContainersService } from 'src/app/service/containers.service';
import { MatSnackBar, MatDialogRef, MAT_DIALOG_DATA, MatSnackBarConfig } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { OrganizationId } from 'src/app/interface/organization.interface';

@Component({
  selector: 'app-add-container',
  templateUrl: './add-container.component.html',
  styleUrls: ['./add-container.component.less']
})
export class AddContainerComponent implements OnInit {

  containerForm = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    requirements: [''],
  });

  constructor(
    public dialogRef: MatDialogRef<AddContainerComponent>,
    private fb: FormBuilder,
    private sb: MatSnackBar,
    private containerService: ContainersService,
    @Inject(MAT_DIALOG_DATA) public organization: OrganizationId,
  ) { }

  ngOnInit() {
  }

  submit() {
    console.log(`Form input: ${JSON.stringify(this.containerForm.value, null, 2)}`);
    const name: string = this.containerForm.value.name;
    this.containerForm.value.uri = name.replace(/\s+/g, '-').toLowerCase();
    this.containerService.addContainer(this.organization.id, this.containerForm.value);
    const message = `Created container ${this.containerForm.value.name}!`;
    const config: MatSnackBarConfig = {
      duration: 1000 * 1.5
    };
    this.dialogRef.close();
    this.sb.open(message, null, config);
  }

}
