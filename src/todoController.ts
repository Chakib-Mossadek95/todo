import { Request, Response } from "express"; //importer les typre de request et vresponse from express
import { deletedTodoList, updateTodoList, addTodoList, getTodosList } from "./mongo_function"; //importer les fonction de todolist
import { TodoEntity } from "./typings"; //importer entity
class TodosController {
  //creee une class todocontroller
  async updateTodo(req: Request, res: Response) {
    // cree fonction recu request response
    try {
      if (typeof req.body._id === "string" && typeof req.body.data === "string") {
        //verfier les typre des request
        const _id: string = req.body._id; //initialiser id
        const data: string = req.body.data; //initialiser data
        let completed: boolean; //cree completed
        if (req.body.completed === "true") {
          //verfier completed
          completed = true; //affecter completed avec trrue
        } else {
          completed = false; //affecter completed avec false
        }
        const list = await updateTodoList(_id, data, completed); //cree list prend le retour de la fonction updatetodolist
        const list1 = new TodoEntity(list); //cree list1 une extention du todoentity et comme argument on a list
        res.json(list1); //reponder avec list1
        return list1; //retourner la list1
      } else {
        throw new Error("wrong data"); // si error throw
      }
    } catch (error) {
      //cathc error
      this.respondWithError(req, res, error); //creee response error
    }
  }

  async deleteTodo(req: Request, res: Response) {
    //cree fonction delettodo
    try {
      if (typeof req.body._id === "string") {
        //verifier id dans request body
        const _id = req.body._id; //initialiser id
        const list = await deletedTodoList(_id); //cree list le retour du fonction deletodolist
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
    //cree fonction addtodo
    try {
      if (typeof req.body.input === "string") {
        //verifier les request body input
        const data: string = req.body.input; //inbitialiser data
        const result = await addTodoList(data); //iniitialiser result
        const mapped = new TodoEntity(result); //initialiser mapped
        res.json(mapped);
      } else {
        throw new Error("wrong input");
      }
    } catch (error) {
      this.respondWithError(req, res, error);
    }
  }

  respondWithError(req: Request, res: Response, err?: { status: number; message: string }) {
    //cree type de reponse d error
    res.status(err?.status || 400).send(err?.message || "erreur general"); //soit status soit 400 et retourner message d error ou bien erreur generale
  }

  async getTodosList(req: Request, res: Response) {
    // cree fonction gettodolist
    const list = await getTodosList(); //intialiser list avec le retour du fonction gettodoslist
    const list1 = list.map((item) => new TodoEntity(item)); //mapper  list et cree  des element du todoentity
    res.json(list1); // reponder la list1  le retour du fonction map
    return list1;
  }
}
interface ITodo {
  //cree interface contien name et completed
  name: string;
  completed: boolean;
  editing: boolean;
}
const todosController = new TodosController(); //cree new instance du todoscontroller
export { todosController, ITodo }; //exporter todocontroller et itodo
