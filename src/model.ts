import mongoose from "mongoose";
mongoose.connect(
  process.env.MONGODB_URI || "mongodb+srv://chakib:cms@cluster0.ywg8u.mongodb.net/todo_app?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }
);
const TodoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  completed: { type: Boolean, default: false },
  editing: { type: Boolean, default: false }
});
const Todo = mongoose.model("todo", TodoSchema);
export { Todo };
