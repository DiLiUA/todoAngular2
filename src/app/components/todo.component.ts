import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { TodoService } from '../services/todo.service';
import { Todo } from './todo';

@Component({
  selector: 'sg-todo',
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

  filtering(filter: string): void {
    if (filter === 'Active') {
      this.todos = this.getItemsLeft();
    } else if (filter === 'Completed') {
      this.todos = this.getItemsDone();
    } else {
      this.todos = this.todoService.getTodos();
    }
  }

  addTodo(form: FormGroup, event): void {
    event.preventDefault();
    const text = form.value.todo;

    if (text.trim().length) {
      this.todoService.add(text);
      this.filtering(this.filter);
      form.reset();
    }
  }

  toggleDone(todo: Todo): void {
    this.todoService.toggleDone(todo);
    this.filtering(this.filter);
  }

  removeTodo(todo: Todo): void {
    this.todoService.remove(todo);
    this.filtering(this.filter);
  }

  getItemsLeft(): Todo[] {
    return this.todoService.getItemsLeft();
  }

  getItemsDone(): Todo[] {
    return this.todoService.getItemsDone();
  }

  changeFilter(filter: string): void {
    this.filter = filter;
    this.filtering(filter);
  }
}
