import { NgModule } from '@angular/core';

import { SharedModule } from "@shared/shared.module";
import { TodoRoutingModule } from "@modules/todo/todo-routing.module";
import { TodoListComponent, TodoComponent, TodoCreationModalComponent } from './components/index';

@NgModule({
  declarations: [
    TodoListComponent,
    TodoComponent,
    TodoCreationModalComponent,
  ],
  imports: [
    TodoRoutingModule,
    SharedModule
  ]
})
export class TodoModule { }
