import express, { json } from "express"; //importer express pour serveur et json  pour le format
import cors from "cors";
import { todoRouter } from "./todoRouter"; //importer todorouter qu'on a cree

const app = express(); //cree app

app.use(json()); //utilise format json
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "DELETE,POST,PUT");
  next();
});

app.use("/", express.static("public")); //fournier des fichier static son nom est public dans le meme fichier du projet
app.use("/Todo", todoRouter); //path /todo utilise le routeur todorouter
// static folder
const port = process.env.PORT || 3002; //utilise le port 3002 pour le serveurrecue les requettes
app.listen(port, () => {
  //listening en utilissant le port 3002 et function callback qui affiche un message
  // tslint:disable-next-line: no-console
  console.log(`listening on port ${port}`);
});
export { app }; //exporter app
