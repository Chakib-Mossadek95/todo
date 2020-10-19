import { Todo } from "./model";
const getTodosList = () => {
  return Todo.find({});
};
const updateTodoList = (_id: string, name: string, completed: boolean) => {
  return Todo.findByIdAndUpdate(_id, { name, completed }, { new: true });
};
const deletedTodoList = (_id: string) => {
  return Todo.findByIdAndDelete(_id);
};
const addTodoList = (data: string) => {
  const newTodo = new Todo({
    name: data
  });
  return newTodo.save();
};
export { deletedTodoList, updateTodoList, addTodoList, getTodosList };
