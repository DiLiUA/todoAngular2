import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';

import { TodoComponent } from './todo.component';
import { TodoService } from '../services/todo.service';
import { Todo } from './todo';

describe('Component. TodoComponent', () => {
  let fixture: ComponentFixture<TodoComponent>;
  let context: TodoComponent;
  let service: TodoService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TodoComponent
      ],
      providers: [TodoService],
      imports: [FormsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoComponent);
    context = fixture.debugElement.componentInstance;
    service = TestBed.get(TodoService);
    context.filter = 'All';
  });

  it('should get todos empty array', () => {
    localStorage.clear();
    context.todos = [];

    expect(context.todos).toEqual([]);
  });

  it('should check todos', () => {
    const todo = {text: 'test todo', completed: false, id: 1};
    service.todos = [new Todo(todo)];

    fixture.detectChanges();

    expect(context.todos).toEqual([new Todo(todo)]);
  });

  it('should not add todo if provided text is empty', () => {
    const event = new Event('customClick');
    spyOn(event, 'preventDefault');
    const form = new FormGroup({
      todo: new FormControl()
    });
    form.patchValue({todo: ''});
    context.todos = [];

    fixture.detectChanges();
    context.addTodo(form, event);

    expect(context.todos.length).toEqual(0);
  });

  it('should add new todo', () => {
    const event = new Event('customClick');
    spyOn(event, 'preventDefault');
    const form = new FormGroup({
      todo: new FormControl()
    });
    form.patchValue({todo: 'test todo'});
    service.todos = [];

    context.addTodo(form, event);

    expect(context.todos.length).toEqual(1);
  });

  it('should toggle done todo', () => {
    const todo = new Todo({text: 'test todo'});
    service.todos = [todo];

    context.toggleDone(todo);

    expect(context.todos[0].completed).toBe(true);
  });

  it('should remove todo', () => {
    const todo = new Todo({text: 'test todo'});
    service.todos = [todo];

    context.removeTodo(todo);

    expect(context.todos).toEqual([]);
  });

  it('should get left todos', () => {
    const todos = [new Todo({text: 'test todo 1'}), new Todo({text: 'test todo 2', completed: true})];
    service.todos = todos;

    context.filtering('Active');

    expect(context.todos.length).toEqual(1);
    expect(context.todos[0]).toEqual(todos[0]);
  });

  it('should get done todos', () => {
    const todos = [new Todo({text: 'test todo 1'}), new Todo({text: 'test todo 2', completed: true})];
    service.todos = todos;

    context.filtering('Completed');

    expect(context.todos.length).toEqual(1);
    expect(context.todos[0]).toEqual(todos[1]);
  });

  it('should change visibility filter', () => {
    const filter = 'Active';
    const todos = [new Todo({text: 'test todo 1'}), new Todo({text: 'test todo 2', completed: true})];
    service.todos = todos;

    context.changeFilter(filter);

    expect(context.filter).toEqual(filter);
    expect(context.todos.length).toEqual(1);
    expect(context.todos[0]).toEqual(todos[0]);
  });
});
