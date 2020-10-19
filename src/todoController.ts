import { Request, Response } from "express";
import { deletedTodoList, updateTodoList, addTodoList, getTodosList } from "./mongo_function";
import { TodoEntity } from "./typings";
class TodosController {
  async updateTodo(req: Request, res: Response) {
    try {
      if (typeof req.body._id === "string" && typeof req.body.data === "string") {
        const _id: string = req.body._id;
        const data: string = req.body.data;
        let completed: boolean;
        if (req.body.completed === "true") {
          completed = true;
        } else {
          completed = false;
        }
        const list = await updateTodoList(_id, data, completed);
        const list1 = new TodoEntity(list);
        res.json(list1);
        return list1;
      } else {
        throw new Error("wrong data");
      }
    } catch (error) {
      this.respondWithError(req, res, error);
    }
  }
  async deleteTodo(req: Request, res: Response) {
    try {
      if (typeof req.body._id === "string") {
        const _id = req.body._id;
        const list = await deletedTodoList(_id);
        const list1 = new TodoEntity(list);
        res.json(list1);
        return list1;
      } else {
        throw new Error("canot delete error input");
      }
    } catch (error) {
      this.respondWithError(req, res, error);
    }
  }
  async addTodo(req: Request, res: Response) {
    try {
      if (typeof req.body.input === "string") {
        const data: string = req.body.input;
        const result = await addTodoList(data);
        const mapped = new TodoEntity(result);
        res.json(mapped);
      } else {
        throw new Error("wrong input");
      }
    } catch (error) {
      this.respondWithError(req, res, error);
    }
  }
  respondWithError(req: Request, res: Response, err?: { status: number; message: string }) {
    res.status(err?.status || 400).send(err?.message || "erreur general");
  }
  async getTodosList(req: Request, res: Response) {
    const list = await getTodosList();
    const list1 = list.map((item) => new TodoEntity(item));
    res.json(list1);
    return list1;
  }
}
interface ITodo {
  name: string;
  completed: boolean;
  editing: boolean;
}
const todosController = new TodosController();
export { todosController, ITodo };
