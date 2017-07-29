export interface TodoInterface {
  text: string;
  completed?: boolean;
  id?: number;
}

export class Todo {
  id: number;
  text: string;
  completed: boolean;

  constructor(todo: TodoInterface) {
    this.text = todo.text;
    this.id = todo.id || new Date().getMilliseconds();
    this.completed = todo.completed || false;
  }
}
