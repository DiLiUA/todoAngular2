export class Todo {
  id: number;
  text: string;
  completed: boolean;

  constructor(text: string) {
    this.text = text;
    this.id = new Date().getMilliseconds();
    this.completed = false;
  }
}
