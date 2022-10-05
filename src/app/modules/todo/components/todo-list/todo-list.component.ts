import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SortType } from '@shared/constants/sortType';
import { ITodo } from '@shared/interfaces/ITodo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  @Input()
  todoList: ITodo[];

  @Input()
  sortBy: SortType;

  @Output()
  editTodo: EventEmitter<ITodo> = new EventEmitter();

  @Output()
  removeTodo: EventEmitter<string> = new EventEmitter();

  @Output()
  complateTodo: EventEmitter<string> = new EventEmitter();

  @Output()
  sortingBy: EventEmitter<SortType> = new EventEmitter();

  sortType = SortType;
}
