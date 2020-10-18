import { Todo } from "./model"; //importer todo
const getTodosList = () => {
  //cree fonction gettodolist
  return Todo.find({}); //retourner la list du mongodb apres retourner tous les objet dans la base de donnee
};

const updateTodoList = (_id: string, name: string, completed: boolean) => {
  //cree fonction updateTodolist
  return Todo.findByIdAndUpdate(_id, { name, completed }, { new: true }); // utilise le model et chercher dans mongidb et update element trouver par id
};
const deletedTodoList = (_id: string) => {
  //creee fonction delete
  return Todo.findByIdAndDelete(_id); //// utilise le model et chercher dans mongidb et delete element trouver par id
};

const addTodoList = (data: string) => {
  // cree fonction addtodolist
  const newTodo = new Todo({
    //cree elemnt du modele todo
    name: data //affecter le nom
  });
  return newTodo.save(); //enregister l element
};

export { deletedTodoList, updateTodoList, addTodoList, getTodosList }; // exporter les fonction procede
