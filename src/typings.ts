import { ITodo } from "./todoController";
export class TodoEntity implements ITodo {
  public _id: string;
  public name;
  public completed;
  public editing;
  constructor(todoProps: any) {
    this._id = todoProps._id;
    this.name = todoProps.name;
    this.completed = todoProps.completed;
    this.editing = todoProps.editing;
  }
}
