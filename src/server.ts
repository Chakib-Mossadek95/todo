import express, { json } from "express";
import cors from "cors";
import { todoRouter } from "./todoRouter";
const app = express();
app.use(json());
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "DELETE,POST,PUT");
  next();
});
app.use("/", express.static("public"));
app.use("/Todo", todoRouter);
const port = process.env.PORT;
app.listen(port, () => {
  // tslint:disable-next-line: no-console
  console.log(`listening on port ${port}`);
});
export { app };
