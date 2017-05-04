import { Component, OnInit } from '@angular/core';

import { TodoService } from '../services/todo.service';
import { Todo } from './todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html'
})
export class TodoComponent implements OnInit {
  todos: Todo[];
  newTodoText: string;
  filter: string;

  constructor(private todoService: TodoService) {
  }

  ngOnInit() {
    this.filter = 'All';
    this.filtering(this.filter);
    this.newTodoText = '';
  }

  filtering(filter) {
    if (filter === 'All') {
      this.todos = this.todoService.getTodos();
    } else if (filter === 'Active') {
      this.todos = this.getItemsFlag(false);
    } else if (filter === 'Completed') {
      this.todos = this.getItemsFlag(true);
    }
  }

  addTodo() {
    if (this.newTodoText.trim().length) {
      this.todoService.add(this.newTodoText);
      this.newTodoText = '';
      this.filtering(this.filter);
    }
  }

  toggleDone(todo: Todo) {
    this.todoService.toggleDone(todo);
    this.filtering(this.filter);
  }

  removeTodo(todo: Todo) {
    this.todoService.remove(todo);
    this.filtering(this.filter);
  }

  getItemsFlag(flag: boolean) {
    return this.todoService.filtering(flag);
  }

  changeFilter(filter: string) {
    this.filter = filter;
    this.filtering(filter);
  }
}
