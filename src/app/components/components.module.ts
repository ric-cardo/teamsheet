import { NgModule } from '@angular/core';


import { 
  MdTabsModule,
  MdMenuModule,
  MdGridListModule,
  MdDialogModule,
  MdToolbarModule,
  MdButtonModule,
  MdIconModule,
  MdButtonToggleModule,
  MdInputModule,
  MdCardModule,
  MdRadioModule,
  MdSidenavModule,
  MdListModule,
  MdSelectModule,
  
} from '@angular/material';

const components = [
    MdTabsModule,
    MdMenuModule,
    MdGridListModule,
    MdDialogModule,
    MdToolbarModule,
    MdButtonModule,
    MdIconModule,
    MdButtonToggleModule,
    MdInputModule,
    MdCardModule,
    MdRadioModule,
    MdSidenavModule,
    MdListModule,
    MdSelectModule, 
]

import 'hammerjs';


@NgModule({
  imports: [...components ],
  exports: [...components ],
})
export class ComponentsModule { }
