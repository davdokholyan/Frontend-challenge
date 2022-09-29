import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { AboutTaskComponent } from './about-task/about-task.component';

const routes: Routes = [
  { path: '', component: AboutTaskComponent }
];

@NgModule({
  declarations: [
    AboutTaskComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AboutTaskModule { }
