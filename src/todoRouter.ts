import { Router } from "express";
import { todosController } from "./todoController";
const todoRouter = Router();
todoRouter.get("/", async (req, res) => {
  await todosController.getTodosList(req, res);
});
todoRouter.post("/", async (req, res) => {
  await todosController.addTodo(req, res);
});
todoRouter.put("/", async (req, res) => {
  await todosController.updateTodo(req, res);
});
todoRouter.delete("/", async (req, res) => {
  await todosController.deleteTodo(req, res);
});
export { todoRouter };
