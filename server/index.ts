import express, { Express, Request, Response } from "express";
const app: Express = express(); /* use route */
import http from "http";
import path from "path";
import mongoose from "mongoose";
import { Server } from "socket.io";
import { createHandler } from "graphql-http/lib/use/express";
import expressPlay from "graphql-playground-middleware-express";
import { schemaUser } from "./schemaChat";
import { ChatSchema } from "./graphql";
//setup mongoose
mongoose.connect(
  "mongodb+srv://admin:admin@castdb.ju6ktqj.mongodb.net/?retryWrites=true&w=majority"
);
const db = mongoose.connection;

app.use(express.json());
const server = http.createServer(app);
const io = new Server(server);
//ROUTES graphql
app.all("/graphql", createHandler({ schema: ChatSchema }));
app.get("/playground", expressPlay({ endpoint: "/graphql" }));
////ROUTES
/* app.get("/create", async (req: Request, res: Response) => {
  try {
    const user = await schemaUser.create({
      //FIXME example create with database
      user: "prova2",
      message: "messaggio2",
    });
    res.status(200).json(user);
  } catch (error: unknown) {
    res.status(500).json({ Message: (error as Error).message });
  }
}); */
// TODO replace with react
app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../chat.html"));
});

//comunication client/server  for instant message
io.on("connection", (socket) => {
  console.log("user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  // user;message
  socket.on("chat message", async (msg: string) => {
    //TODOmaybe use objects
    const user = msg.split(";")[0];
    const message = msg.split(";")[1];
    if (user.trim() === "") {
      console.error("User null");
      return true;
    }
    if (message.trim() === "") {
      console.error("null message");
      return true;
    }

    //i have to pass also the user in the future
    await schemaUser.create({
      //FIXME example create with database
      user: user,
      message: message,
    });
    io.emit("chat message", message);
  });
});
//start db and server
db.on("error", (error) => {
  console.log(error);
});
db.on("open", () => {
  console.log("connected to database");
  //start server
  server.listen(3000, () => {
    console.log("listenig to port 3000");
  });
});
