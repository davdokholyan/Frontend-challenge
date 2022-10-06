import { Pipe, PipeTransform } from '@angular/core';
import { ITodo } from "@shared/interfaces/ITodo";

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(
    todos: ITodo[],
    searchText: string
  ): ITodo[] {
    if (!searchText.trim()) {
      return todos
    }

    return todos.filter(todo => todo.title.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()));
  }
}
