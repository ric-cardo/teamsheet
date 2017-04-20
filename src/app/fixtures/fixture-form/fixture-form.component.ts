import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { MdDialogRef } from '@angular/material';
import { FixtureService } from '../fixture.service';

@Component({
  selector: 'app-fixture-form',
  templateUrl: './fixture-form.component.html',
  styleUrls: ['./fixture-form.component.scss']
})
export class FixtureFormComponent implements OnInit {
  form: FormGroup;
  isEditMode;
  constructor(
    private fb: FormBuilder, 
    private fixtureService: FixtureService,
    public dialogRef: MdDialogRef<FixtureFormComponent>
  ) { }

  ngOnInit() {

    const model  = Object.assign(
      {},
      this.getDefaultValues(),
      this.dialogRef.config.data
    );

    this.isEditMode = this.dialogRef.config.data && this.dialogRef.config.data.hasOwnProperty('$key');
    
    this.form = this.fb.group({
      opponent: [model.opponent, Validators.required],
      address: [model.address, Validators.required],
      date: [model.date, Validators.required],
      ground: [model.ground, Validators.required],
    });
  }

  getDefaultValues(){
    return {
      opponent: undefined,
      address:  undefined,
      date: undefined,
      ground: undefined,
    };
  }

  add(formData){
    formData.date = formData.date.getTime();
    this.fixtureService.add(formData);
    this.dialogRef.close();
  }

  update(formData){

    if(typeof formData.date.getTime === 'function'){
       formData.date =  formData.date.getTime();
    }
   
    this.fixtureService.update(this.dialogRef.config.data.$key,formData);
    this.dialogRef.close();
  }
}


