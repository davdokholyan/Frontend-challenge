import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzSelectModule } from 'ng-zorro-antd/select';

import { ErrorMsgComponent, HeaderComponent, NotFoundComponent } from "@shared/components";


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  declarations: [
    HeaderComponent,
    ErrorMsgComponent,
    NotFoundComponent
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    HeaderComponent,
    ErrorMsgComponent,
    NotFoundComponent,
    NzButtonModule,
    NzModalModule,
    NzListModule,
    NzSelectModule
  ]
})
export class SharedModule { }
