import { TestBed } from '@angular/core/testing';

import { TodoService } from './todo.service';
import { Todo } from '../components/todo';

describe('Service. Todo service', () => {
  let service: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TodoService
      ]
    });
    service = TestBed.get(TodoService);
  });

  it('should return todos empty array', () => {
    service.todos = [];

    const todos = service.getTodos();

    expect(todos).toEqual([]);
  });

  it('should return todos', () => {
    service.todos = [new Todo({text: 'test todo'})];

    const todos = service.getTodos();

    expect(todos.length).toEqual(1);
    expect(todos).toEqual(service.todos);
  });

  it('should add new todo', () => {
    const text = 'test todo';
    service.todos = [];

    service.add(text);

    expect(service.todos.length).toEqual(1);
    expect(service.todos[0].text).toEqual(text);
  });

  it('should toggle done todo', () => {
    const todo = new Todo({text: 'test todo'});
    service.todos = [todo];

    service.toggleDone(todo);

    expect(service.todos[0].completed).toBe(true);
  });

  it('should remove todo', () => {
    const todo = new Todo({text: 'test todo'});
    service.todos = [todo];

    service.remove(todo);

    expect(service.todos).toEqual([]);
  });

  it('should return left todos', () => {
    const todos = [new Todo({text: 'test todo 1'}), new Todo({text: 'test todo 2', completed: true})];
    service.todos = todos;

    const filteredTodos = service.getItemsLeft();

    expect(filteredTodos.length).toEqual(1);
    expect(filteredTodos[0]).toEqual(todos[0]);
  });

  it('should return done todos', () => {
    const todos = [new Todo({text: 'test todo 1'}), new Todo({text: 'test todo 2', completed: true})];
    service.todos = todos;

    const filteredTodos = service.getItemsDone();

    expect(filteredTodos.length).toEqual(1);
    expect(filteredTodos[0]).toEqual(todos[1]);
  });
});
