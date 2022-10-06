import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable, Subject, takeUntil } from 'rxjs';
import { NzModalRef, NzModalService } from "ng-zorro-antd/modal";
import { Select, Store } from "@ngxs/store";
import { Navigate } from '@ngxs/router-plugin';

import { AuthenticationState } from '@core/store/authentication.state';
import { AddTodo, CompleteTodo, EditTodo, RemoveTodo, SortingBy } from '@core/actions/authentication.action';
import { ITodo } from '@shared/interfaces/ITodo';
import { SortType } from '@shared/constants/sortType';
import { TodoCreationModalComponent } from "@modules/todo/components";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit, OnDestroy {
  private onDestroy$ = new Subject<void>();

  @Select(AuthenticationState.todoList)
  todoList$: Observable<ITodo[]>;

  sortBy: SortType;

  constructor(
    private store: Store,
    private modalService: NzModalService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.pipe(takeUntil(this.onDestroy$)).subscribe(({ sortBy }) => {
      this.sortBy = sortBy || SortType.A_Z_DATE;
      this.store.dispatch(new SortingBy({ sortBy: this.sortBy }))
    });
  }

  addTodo(editTodo?: ITodo): void {
    const todoCreationModalComponent: NzModalRef<TodoCreationModalComponent> =
      this.modalService.create({
        nzTitle: editTodo?.id
          ? 'Edit Todo'
          : 'Add Todo',
        nzContent: TodoCreationModalComponent,
        nzComponentParams: {
          editTodo: editTodo?.id ? editTodo : null
        },
        nzMaskClosable: false,
        nzFooter: [
          {
            label: 'Cancel',
            type: 'default',
            onClick: () => todoCreationModalComponent.close()
          },
          {
            label: editTodo?.id ? 'Save' : 'Add',
            type: 'primary',
            disabled: component =>
              component.todoCreationForm.invalid ||
              (component.todoCreationForm.untouched && !component.todoCreationForm.dirty),
            onClick: component => {
              if (component.todoCreationForm.valid) {
                const todo: ITodo = {
                  completed: false,
                  date: new Date(),
                  ...component.todoCreationForm.getRawValue()
                };

                const action = editTodo?.id
                  ? new EditTodo({ todo, id: editTodo.id })
                  : new AddTodo({ todo });

                this.store.dispatch(action).subscribe({
                  next: () => {
                    todoCreationModalComponent.close();
                  }
                });
              }
            }
          }
        ],
        nzWidth: 500
      });
  }

  removeTodo(id: string): void {
    this.modalService.confirm({
      nzTitle: 'Are you sure delete this todo?',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.store.dispatch(new RemoveTodo({ id })),
      nzCancelText: 'No'
    });
  }

  completeTodo(todo: ITodo): void {
    if (!todo.completed) {
    this.modalService.confirm({
      nzTitle: 'Do you want to complete this todo?',
      nzOnOk: () => this.store.dispatch(new CompleteTodo({ id: todo.id })),
      nzOkText: 'Yes',
      nzCancelText: 'No'
    });
    }
  }

  sortingBy(sortBy: SortType): void {
    this.store.dispatch(new Navigate([], { sortBy }, { queryParamsHandling: 'merge' }))
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
