import express, { Express, Request, Response } from "express";
const app: Express = express(); /* use route */
import http from "http";
import path from "path";
import { Server } from "socket.io";
import { createHandler } from "graphql-http/lib/use/express";
import express_play from "graphql-playground-middleware-express";

import { GraphQLSchema, GraphQLObjectType, GraphQLString } from "graphql";

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
app.all("/graphql", createHandler({ schema }));
app.get("/playground", express_play({ endpoint: "/graphql" }));
app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../chat.html"));
});

io.on("connection", (socket) => {
  console.log("user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

server.listen(3000, () => {
  console.log("listenig to port 3000");
});
