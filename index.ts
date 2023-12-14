import express, { Express, Request, Response } from "express";
const app: Express = express(); /* use route */
import http from "http";
import path from "path";
import mongoose from "mongoose";
import { Server } from "socket.io";
import { createHandler } from "graphql-http/lib/use/express";
import express_play from "graphql-playground-middleware-express";


import { GraphQLSchema, GraphQLObjectType, GraphQLString } from "graphql";
//TODO Pass the user
//setup mongoose 
mongoose.connect("mongodb+srv://admin:admin@castdb.ju6ktqj.mongodb.net/?retryWrites=true&w=majority")
const db = mongoose.connection
db.on("error",(error)=>{
  console.log(error);
})
db.on("open",()=>{
  console.log("connected to database");
  
})
app.use(express.json())

import { schemaUser } from './chat';


app.get("/create", async(req: Request, res: Response) => {
  try{
    const user = await schemaUser.create({
    author: "prova",
    message: "messaggio"
  })
  res.status(200).json(user)
  }
  catch(error:unknown){
    res.status(500).json({Message:(error as Error).message})

  }
});
//make express accept json
// Construct a schema, using GraphQL schema language
const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      hello: {
        type: GraphQLString,
        resolve: () => "world",
      },
    },
  }),
});

const server = http.createServer(app);
const io = new Server(server);

//api route 
app.all("/graphql", createHandler({ schema }));
app.get("/playground", express_play({ endpoint: "/graphql" }));

// home route 
app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../chat.html"));
});


//comunication with client for instant message
io.on("connection", (socket) => {
  console.log("user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
// user;message
  socket.on("chat message", (msg:string) => {
    const user = msg.split(";")[0]
    const message = msg.split(";")[1]
    if (user === "") console.error("User null")
    else console.log("User "+user+" is writing");
    //i have to pass also the user in the future
    io.emit("chat message", message); 
  });
});
//start server
server.listen(3000, () => {
  console.log("listenig to port 3000");
});
