import { Router } from "express"; //importer router du express pour cree un routeur
import { todosController } from "./todoController"; //importer todocontroller ???????????????
const todoRouter = Router(); //cree un router du nom todorouter
todoRouter.get("/", async (req, res) => {
  //utiliser la methode get  et callback synchrone
  // tslint:disable-next-line: no-console
  await todosController.getTodosList(req, res); //attender le reponse de cette line pour continuer et utiliser la fonction gettodoslist
});

todoRouter.post("/", async (req, res) => {
  //utiliser la methode post pour envoyer des nouveaux elements
  await todosController.addTodo(req, res); //appler la fonction addtodo
});
todoRouter.put("/", async (req, res) => {
  //tiliser la methode put pour modifier des elements
  await todosController.updateTodo(req, res); //appler la fonction updatetodo
});
todoRouter.delete("/", async (req, res) => {
  //utiliser la methode delete pour supprimer des elements
  await todosController.deleteTodo(req, res); //appler la methode deletetodo
});

export { todoRouter }; //exporter todorouter
