import express, { Express } from "express";
const app: Express = express(); /* use route */
import http from "http";
import mongoose from "mongoose";
import { Server } from "socket.io";
import { createHandler } from "graphql-http/lib/use/express";
import expressPlay from "graphql-playground-middleware-express";
import { schemaChannel, schemaMessage, schemaUser } from "./schemas/schemas";
import { ChatSchema } from "./graphql/graphql";
import cors from "cors";
//setup mongoose
mongoose.connect(
  "mongodb+srv://admin:admin@castdb.ju6ktqj.mongodb.net/?retryWrites=true&w=majority"
);
const db = mongoose.connection;
//TODO make dynamic from graphql
export type ChatUser = {
  user: string;
  message: string;
};

app.use(express.json());
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
//ROUTES graphql
app.all("/graphql", createHandler({ schema: ChatSchema }));
app.get("/createMockData", async (req, res) => {
  try {
    // Generate mock data
    const users = await schemaUser.insertMany([
      { user: "Alice", message: null, channel_ids: [] },
      { user: "Bob", message: null, channel_ids: [] },
      // Add more users as needed
    ]);

    const messages = await schemaMessage.insertMany([
      {
        _creator: users[0]._id,
        content: "Hello, world!",
        user_id: users[1]._id,
      },
      { _creator: users[1]._id, content: "Hi there!", user_id: users[0]._id },
      // Add more messages as needed
    ]);

    const channels = await schemaChannel.insertMany([
      { title: "General", users: [users[0]._id, users[1]._id] },
      // Add more channels as needed
    ]);

    // Update user data with message and channel references
    await schemaUser.updateOne(
      { _id: users[0]._id },
      { $set: { message: messages[0]._id, channel_ids: [channels[0]._id] } }
    );
    await schemaUser.updateOne(
      { _id: users[1]._id },
      { $set: { message: messages[1]._id, channel_ids: [channels[0]._id] } }
    );

    res.send("Mock data created successfully.");
  } catch (error) {
    console.error("Error creating mock data:", error);
    res.status(500).send("Error creating mock data.");
  }
});
app.all("/deleteAll", async () => {
  await schemaUser.deleteMany({});
});
app.get("/playground", expressPlay({ endpoint: "/graphql" }));
//comunication client/server  for instant message
io.on("connection", (socket) => {
  console.log("user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  // user;message
  socket.on("chat message", async (chatUser: ChatUser) => {
    const user = chatUser.user;
    const message = chatUser.message;
    if (user.trim() === "") {
      console.error("User null");
      return;
    }
    if (message.trim() === "") {
      console.error("Message null");
      return;
    }

    /* await schemaUser.create(chatUser); */
    io.emit("chat message", chatUser);
  });
});
//start db and server
db.on("error", (error) => {
  console.error(error);
});
db.on("open", () => {
  console.log("connected to database");
  //start server
  server.listen(3000, () => {
    console.log("listenig to port 3000");
  });
});
