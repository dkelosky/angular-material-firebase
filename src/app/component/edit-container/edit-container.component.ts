import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatBottomSheet, MatSnackBarConfig, MatSnackBar } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfirmComponent } from '../confirm/confirm.component';
import { Confirm } from 'src/app/interface/confirm.interface';
import { ContainersService } from 'src/app/service/containers.service';
import { ContainerId } from 'src/app/interface/container.interface';
import { OrganizationId } from 'src/app/interface/organization.interface';

 interface EditContainerData {
  organization: OrganizationId;
  container: ContainerId;
}

@Component({
  selector: 'app-edit-container',
  templateUrl: './edit-container.component.html',
  styleUrls: ['./edit-container.component.less']
})
export class EditContainerComponent implements OnInit {

  containerForm = this.fb.group({
    description: ['', Validators.required],
    requirements: [''],
  });

  constructor(
    public dialogRef: MatDialogRef<EditContainerComponent>,
    private fb: FormBuilder,
    private containersService: ContainersService,
    private bottomSheet: MatBottomSheet,
    private sb: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: EditContainerData,
  ) {
    this.containerForm.get('description').setValue(this.data.container.description);
    this.containerForm.get('requirements').setValue(this.data.container.requirements);
  }

  ngOnInit() {
  }

  submit() {
    console.log(`Form input: ${JSON.stringify(this.containerForm.value, null, 2)}`);

    // change values from form
    this.data.container.description = this.containerForm.value.description;
    this.data.container.requirements = this.containerForm.value.requirements;

    this.containersService.setContainer(this.data.organization.id, this.data.container);
    const message = `Updated container ${this.data.container.name}!`;
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
    console.log(`Remove called for ${this.data.container.name}`);

    const data: Confirm = {
      entity: this.data.container,
      ref: this.dialogRef,
      message: `Are you sure you want to remove ${this.data.container.name}?`,
      affirm: 'Yes',
      deny: 'Cancel',
      affirmAction: () => {
        this.containersService.deleteContainer(this.data.organization.id, this.data.container);
      },
      successMessage: `Removed entry for ${this.data.container.name}`,
    };

    this.bottomSheet.open(ConfirmComponent, {
      data,
    });
  }
}
