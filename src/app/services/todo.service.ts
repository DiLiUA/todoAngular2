import { Injectable } from '@angular/core';

import { Todo } from '../components/todo';

@Injectable()
export class TodoService {
  todos: Todo[];

  constructor() {
    this.todos = JSON.parse(localStorage.getItem('todos') || '[]');
  }

  getTodos() {
    return this.todos;
  }

  updateStorage() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }

  add(text: string) {
    this.todos.push(new Todo(text));
    this.updateStorage();
  }

  toggleDone(todo: Todo) {
    this.todos[this.todos.indexOf(todo)].completed = !this.todos[this.todos.indexOf(todo)].completed
    this.updateStorage();
  }

  remove(todo: Todo) {
    this.todos.splice(this.todos.indexOf(todo), 1);
    this.updateStorage();
  }

  filtering(completed: boolean) {
    return this.todos.filter((todo: Todo) => todo.completed === completed);
  }
}
