import { ITodo } from "./todoController"; //importer itodo

export class TodoEntity implements ITodo {
  //cree et exporter la class todoentity qui implement itodo
  public _id: string;
  public name;
  public completed;
  public editing;
  constructor(todoProps: any) {
    //cree constructeur et comme argument on a objet
    this._id = todoProps._id;
    this.name = todoProps.name;
    this.completed = todoProps.completed;
    this.editing = todoProps.editing;
  }
}
