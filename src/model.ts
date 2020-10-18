import mongoose from "mongoose"; //importer mongoose et schema
const uri = "mongodb+srv://chakib:cms@cluster0.ywg8u.mongodb.net/todo_app?retryWrites=true&w=majority"; //definir varrieble prend uri du mongodb
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }); //connecter mongoose et ajouter les

const TodoSchema = new mongoose.Schema({
  //cree schema  constien name et completed
  name: { type: String, required: true },
  completed: { type: Boolean, default: false },
  editing: { type: Boolean, default: false }
});

const Todo = mongoose.model("todo", TodoSchema); //cree modele
export { Todo }; //exporter model
