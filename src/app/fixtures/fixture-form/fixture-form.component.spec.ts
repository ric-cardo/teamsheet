import { FormBuilder } from '@angular/forms';
import { FixtureService } from '../fixture.service';
/* tslint:disable:no-unused-variable */

import { MdDialogRef } from '@angular/material';
import { FixtureFormComponent } from './fixture-form.component';


describe('FixtureFormComponent', () => {
  let component: FixtureFormComponent;
  let dialogRef,dialogData;
  let fixtureService :any = { add(){}, update(){} };

  beforeEach(() => {
    const formbuilder = new FormBuilder();
    dialogRef = {close(){}};
    dialogData = {};
    component = new FixtureFormComponent(
      formbuilder,
      dialogRef as MdDialogRef<FixtureFormComponent>,
      dialogData,
      fixtureService as FixtureService,
    );
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid when all field are empty', () =>{
    component.ngOnInit();
    const {form} = component;
    const formValidity = form.invalid;
    expect(formValidity).toBeTruthy();
  })

  it('should populate form if initialised with data',()=>{
    const expectFormData = {
      opponent: 'team12',
      address: 'somewhere',
      date: '123',
      ground: 'home',
    };
    let formData;

    component.dialogData = Object.assign({},expectFormData)
    component.ngOnInit();
    formData = component.form.value;
   
    expect(expectFormData).toEqual(formData);
  })

  it('should set isEditMode = true, if initialised with data',()=>{
    const expectFormData = {
      opponent: 'team12',
      address: 'somewhere',
      date: '123',
      ground: 'home',
      $key:'123'
    };

    component.dialogData = Object.assign({},expectFormData)
    component.ngOnInit();
   
    expect(component.isEditMode).toBeTruthy();
  })

  it('should set isEditMode = false, if not initialised with data',()=>{
    component.ngOnInit();
   
    expect(component.isEditMode).toBeFalsy();
  })

  it('should not populate form if initialised with no data',()=>{
    const expectFormData = {
      opponent:null,
      address:null,
      date:null,
      ground:null,
    };
    let formData;

    component.ngOnInit();
    formData = component.form.value;
   
    expect(expectFormData).toEqual(formData);
  })

  
  describe('opponent field', () => {
    it('is required', () => {
      let errors;

      component.ngOnInit();
      errors = component.form.controls.opponent.errors;

      expect(errors.required).toBeTruthy(); 
    });

    it('is valid when not empty', () => {
      let field;
      
      component.ngOnInit();
      field = component.form.controls.opponent
      field.setValue('team');
      
      expect(field.valid).toBeTruthy(); 
    });

    it('is invalid when empty', () => {
      let field;
      
      component.ngOnInit();
      field = component.form.controls.opponent
      
      expect(field.valid).toBeFalsy(); 
    });
  });

  describe('ground field', () => {
    it('is required', () => {
      let errors;

      component.ngOnInit();
      errors = component.form.controls.ground.errors;
      
      expect(errors['required']).toBeTruthy(); 
    });

    it('is valid when not empty', () => {
      let field;
      
      component.ngOnInit();
      field = component.form.controls.ground
      field.setValue('home');
      
      expect(field.valid).toBeTruthy(); 
    });

    it('is invalid when empty', () => {
      let field;
      
      component.ngOnInit();
      field = component.form.controls.ground
      
      expect(field.valid).toBeFalsy(); 
    });
  });

  describe('date field', () => {
    it('is required', () => {
      let errors;

      component.ngOnInit();
      errors = component.form.controls.date.errors;
      
      expect(errors.required).toBeTruthy(); 
    });

    it('is valid when not empty', () => {
      let field;
      
      component.ngOnInit();
      field = component.form.controls.date
      field.setValue('home');
      
      expect(field.valid).toBeTruthy(); 
    });

    it('is invalid when empty', () => {
      let field;
      
      component.ngOnInit();
      field = component.form.controls.date
      
      expect(field.valid).toBeFalsy(); 
    });    
  });

  describe('address field', () => {
    it('is required', () => {
      let errors;

      component.ngOnInit();
      errors = component.form.controls.address.errors;
      
      expect(errors.required).toBeTruthy(); 
    });

    it('is valid when not empty', () => {
      let field;
      
      component.ngOnInit();
      field = component.form.controls.address
      field.setValue('home');
      
      expect(field.valid).toBeTruthy(); 
    });

    it('is invalid when empty', () => {
      let field;
      
      component.ngOnInit();
      field = component.form.controls.address
      
      expect(field.valid).toBeFalsy(); 
    });    
  });



  
  describe('add()', () => {
    
    it('should transform date field to timestamp', () => {
      const expectFormData = {
        opponent: 'team',
        address: 'somewhere',
        date: new Date('2016-04-01').getTime(),
        ground: 'home',
      };
      
      spyOn(fixtureService,'add');
    
      component.add({
        opponent:'team',
        address: 'somewhere',
        date: new Date('2016-04-01'),
        ground: 'home',
      });

      expect(fixtureService.add).toHaveBeenCalledWith(expectFormData);
    });
      
    it('should close the dialog', () => {
      spyOn(dialogRef,'close');
      
      component.add({
        opponent:'team',
        address: 'somewhere',
        date: new Date('2016-04-01'),
        ground: 'home',
      });

      expect(dialogRef.close).toHaveBeenCalled();
    });
  });

  describe('update()', () => {
    
    it('should transform date field to timestamp', () => {
      const expectFormData = {
        opponent: 'team',
        address: 'somewhere',
        date: new Date('2016-04-01').getTime(),
        ground: 'home'
      };

      const key = 123
    
      component.dialogData = Object.assign({$key:key},expectFormData)
      component.ngOnInit();
      
      spyOn(fixtureService,'update');
    
      component.update({
        opponent:'team',
        address: 'somewhere',
        date: new Date('2016-04-01'),
        ground: 'home',
      });

      expect(fixtureService.update).toHaveBeenCalledWith(key,expectFormData);
    });
      
    it('should close the dialog', () => {
      const key = 123
      spyOn(dialogRef,'close');

      component.dialogData = {$key:key}
      component.ngOnInit();

      component.update({
        opponent:'team',
        address: 'somewhere',
        date: new Date('2016-04-01'),
        ground: 'home',
      });

      expect(dialogRef.close).toHaveBeenCalled();
    });
  });
    
  
});
