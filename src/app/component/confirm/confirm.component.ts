import { Component, OnInit, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material';
import { ChildId } from 'src/app/service/children.service';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.less']
})
export class ConfirmComponent implements OnInit {

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) private child: ChildId,
    private bottomSheetRef: MatBottomSheetRef<ConfirmComponent>,

  ) { }

  ngOnInit() {
  }

  cancel() {
    console.log(`Called cancel`);
    this.bottomSheetRef.dismiss();
  }

  delete() {
    console.log(`Called delete ${this.child.name}`);
    // console.log(`Deleting topic: ${JSON.stringify(this.data.topic, null, 2)}`);
    // this.t.deleteTopic(this.data.topic);
    console.log(`Navigating back`);
    this.bottomSheetRef.afterDismissed().subscribe(() => {
      console.log(`Dismissed after delete, navigating back`);
      // this.router.navigateByUrl(`/notify`);
    });
    this.bottomSheetRef.dismiss();
  }


}
