import express, {Express,Request,Response} from 'express'
const app :  Express = express() /* use route */
import http from "http";
import path from "path";
import { Server, } from "socket.io";

import { graphqlHTTP } from "express-graphql"
import { buildSchema } from "graphql";

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    quoteOfTheDay: String
    random: Float!
    rollThreeDice: [Int]
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
  quoteOfTheDay: () => {
    return Math.random() < 0.5 ? "Take it easy" : "Salvation lies within";
  },
  random: () => {
    return Math.random();
  },
  rollThreeDice: () => {
    return [1, 2, 3].map((_) => 1 + Math.floor(Math.random() * 6));
  },
};

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);



const server = http.createServer(app);

const io = new Server(server);
app.get("/", (req: Request, res:Response) => {
  
  res.sendFile(path.join(__dirname,"../chat.html"));
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
