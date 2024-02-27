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

async function deleteAll() {
  await schemaUser.deleteMany({});
  await schemaChannel.deleteMany({});
  await schemaMessage.deleteMany({});
}

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

// Route to create mock data
app.get("/createMockData", async (req, res) => {
  await deleteAll();
  try {
    // Generate mock data
    const usersData = [
      { user: "Alice", messages: [], channel_ids: [] },
      { user: "Bob", messages: [], channel_ids: [] },
      // Add more users as needed
    ];

    await schemaUser.insertMany(usersData);
    const usersWithIds = await schemaUser.find({});

    const messagesData = [
      {
        content: "Hello, world!",
        user_id: usersWithIds[0]._id,
      },
      {
        content: "Hello, world2!",
        user_id: usersWithIds[0]._id,
      },
      {
        content: "Hello, world3!",
        user_id: usersWithIds[0]._id,
      },
      {
        content: "Hi there!",
        user_id: usersWithIds[1]._id,
      },
      // Add more messages as needed
    ];

    await schemaMessage.insertMany(messagesData);
    const messagesWithIds = await schemaMessage.find({});

    const channelsData = [
      { title: "General", users: [usersWithIds[0]._id, usersWithIds[1]._id] },
      { title: "Private", users: [usersWithIds[0]._id] },
      // Add more channels as needed
    ];

    await schemaChannel.insertMany(channelsData);
    const channelsWithIds = await schemaChannel.find({});

    // Update user data with message and channel references

    await schemaUser.updateOne(
      { _id: usersWithIds[0]._id },
      {
        $set: {
          messages: messagesWithIds.filter(
            (m) => m.user_id?.toString() === usersWithIds[0]._id?.toString()
          ),
          channel_ids: channelsWithIds.filter((c) =>
            c.users.some(
              (u) => u._id?.toString() === usersWithIds[0]._id?.toString()
            )
          ),
        },
      }
    );

    await schemaUser.updateOne(
      { _id: usersWithIds[1]._id },
      {
        $set: {
          messages: messagesWithIds.filter(
            (m) => m.user_id?.toString() === usersWithIds[1]._id?.toString()
          ),
          channel_ids: channelsWithIds.filter((c) =>
            c.users.some(
              (u) => u._id?.toString() === usersWithIds[1]._id?.toString()
            )
          ),
        },
      }
    );

    await schemaMessage.updateOne(
      { _id: messagesWithIds[0]._id },
      {
        $set: {
          channel_id: channelsWithIds[1]._id,
        },
      }
    );

    await schemaMessage.updateOne(
      { _id: messagesWithIds[1]._id },
      {
        $set: {
          channel_id: channelsWithIds[0]._id,
        },
      }
    );

    await schemaMessage.updateOne(
      { _id: messagesWithIds[2]._id },
      {
        $set: {
          channel_id: channelsWithIds[1]._id,
        },
      }
    );

    await schemaMessage.updateOne(
      { _id: messagesWithIds[3]._id },
      {
        $set: {
          channel_id: channelsWithIds[0]._id,
        },
      }
    );

    res.send("Mock data created successfully.");
  } catch (error) {
    console.error("Error creating mock data:", error);
    res.status(500).send("Error creating mock data.");
  }
});

app.all("/deleteAll", async (req, res) => {
  await deleteAll();
  res.send("Deleted all.");
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
