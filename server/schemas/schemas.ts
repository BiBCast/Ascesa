import { Schema, Types, model } from "mongoose";
// [] one 2 many
const User = new Schema({
  _id: { type: Types.ObjectId },
  user: String,
  password: String,
  messages: [{ type: Types.ObjectId, ref: "Message" }],
  channel_ids: [{ type: Types.ObjectId, ref: "Channel" }],
});

const message = new Schema({
  content: String,
  user_id: { type: Types.ObjectId, ref: "User" },
  channel_id: { type: Types.ObjectId, ref: "Channel" },
});

const channel = new Schema({
  _id: { type: Types.ObjectId },
  title: String,
  users: [{ type: Types.ObjectId, ref: "User" }],
});

export const schemaUser = model("User", User);
export const schemaMessage = model("Message", message);
export const schemaChannel = model("Channel", channel);
