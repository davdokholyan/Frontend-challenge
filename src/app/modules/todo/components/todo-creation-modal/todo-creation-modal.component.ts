import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ITodo } from '@shared/interfaces/ITodo';
import { ITodoForm } from '@shared/interfaces/IForms';

@Component({
  selector: 'app-todo-creation-modal',
  templateUrl: './todo-creation-modal.component.html',
  styleUrls: ['./todo-creation-modal.component.scss']
})
export class TodoCreationModalComponent implements OnInit {
  @Input()
  editTodo: ITodo;

  todoCreationForm: FormGroup;
  descriptionMaxLength = 500;

  ngOnInit(): void {
    this.todoCreationForm = new FormGroup<ITodoForm>({
      title: new FormControl(this.editTodo?.title || null, [Validators.required, Validators.minLength(2), Validators.maxLength(24)]),
      description: new FormControl(this.editTodo?.description || null, [Validators.required, Validators.minLength(2), Validators.maxLength(500)])
    });
  }
}
