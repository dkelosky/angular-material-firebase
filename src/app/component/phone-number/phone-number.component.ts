import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { UserId } from 'src/app/interface/user.interface';

@Component({
  selector: 'app-phone-number',
  templateUrl: './phone-number.component.html',
  styleUrls: ['./phone-number.component.less']
})
export class PhoneNumberComponent implements OnInit {

  tel: string;
  telLink: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public user: UserId,
  ) {
    const s = this.user.phone.toString();
    const formatPhone = `+1-${s[0]}${s[1]}${s[2]}-${s[3]}${s[4]}${s[5]}-${s[6]}${s[7]}${s[8]}${s[9]}`;
    this.tel = formatPhone;
    this.telLink = `tel:` + formatPhone;
  }

  ngOnInit() {
  }

}
