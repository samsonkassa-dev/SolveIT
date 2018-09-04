/** @kal **/

import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {AppTableModule} from "./app-table/app-table.module";
import {AppTableComponent} from "./app-table/app-table.component";
import { Ng2TableModule } from 'ng2-table/ng2-table';


@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    AppTableModule,
    Ng2TableModule
  ],
  providers: [],
  exports: [HeaderComponent, AppTableComponent],
})
export class SharedModule { }
