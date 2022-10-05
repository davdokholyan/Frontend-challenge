import { Component, OnDestroy, OnInit } from '@angular/core';
import { Select, Store } from "@ngxs/store";
import { NzModalRef, NzModalService } from "ng-zorro-antd/modal";
import { TodoCreationModalComponent } from "@modules/todo/components";
import { ITodo } from '@shared/interfaces/ITodo';
import { AddTodo, ComplateTodo, EditTodo, RemoveTodo, SortingBy } from '@core/actions/authentication.action';
import { AuthenticationState } from '@core/store/authentication.state';
import { Observable, Subject, takeUntil } from 'rxjs';
import { SortType } from '@shared/constants/sortType';
import { ActivatedRoute } from '@angular/router';
import { Navigate } from '@ngxs/router-plugin';

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
            type: 'default',
            disabled: component =>
              component.todoCreationForm.invalid ||
              (component.todoCreationForm.untouched && !component.todoCreationForm.dirty),
            onClick: component => {
              if (component.todoCreationForm.valid) {
                const todo: ITodo = {
                  complated: false,
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
    this.store.dispatch(new RemoveTodo({ id }))
  }

  complateTodo(id: string): void {
    this.store.dispatch(new ComplateTodo({ id }))
  }

  sortingBy(sortBy: SortType): void {
    this.store.dispatch(new Navigate([], { sortBy }, { queryParamsHandling: 'merge' }))
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
