import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-indeterminate-loading',
  templateUrl: './indeterminate-loading.component.html',
  styleUrls: ['./indeterminate-loading.component.less', '../../app.component.less']
})
export class IndeterminateLoadingComponent implements OnInit {

  @Input() error: string;
  constructor() { }

  ngOnInit() {
  }

}
