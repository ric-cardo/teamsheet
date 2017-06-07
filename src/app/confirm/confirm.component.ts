import { Component, OnInit } from '@angular/core';

import { MdDialogRef } from '@angular/material';
@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {
  static OK = 'OK';
  static CANCEL = 'CANCEL';
  title;
  content;
  buttons ={
    ok:'ok',
    cancel:'cancel'
  }
  
  constructor(
    public dialogRef: MdDialogRef<ConfirmComponent>
  ) { }

  get cancel(){
    return ConfirmComponent.CANCEL;
  }
  get ok(){
    return ConfirmComponent.OK;
  }

  ngOnInit() {
    const {title,content,buttons} = this.dialogRef.config.data;
    this.title = title;
    this.content = content;
    this.buttons = Object.assign({},this.buttons,buttons);
  }

}
