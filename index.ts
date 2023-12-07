import express, {Express,Request,Response} from 'express'
const app :  Express = express() /* use route */
import http from "http";
import path from "path";
import { Server, } from "socket.io";

const server = http.createServer(app);

const io = new Server(server);
app.get("/", (req: Request, res:Response) => {
  res.sendFile(path.join(__dirname,"../index.html"));
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
