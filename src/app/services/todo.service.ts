import { Injectable } from '@angular/core';

import { Todo } from '../components/todo';

@Injectable()
export class TodoService {
  todos: Todo[];

  constructor() {
    this.todos = JSON.parse(localStorage.getItem('todos') || '[]');
  }

  getTodos(): Todo[] {
    return this.todos;
  }

  updateStorage(): void {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  add(text: string): void {
    this.todos.push(new Todo({text}));
    this.updateStorage();
  }

  toggleDone(todo: Todo): void {
    todo.completed = !todo.completed;
    this.updateStorage();
  }

  remove(removedTodo: Todo): void {
    this.todos = this.todos.filter((todo: Todo) => todo !== removedTodo);
    this.updateStorage();
  }

  getItemsLeft(): Todo[] {
    return this.todos.filter((todo: Todo) => todo.completed === false);
  }

  getItemsDone(): Todo[] {
    return this.todos.filter((todo: Todo) => todo.completed === true);
  }
}
