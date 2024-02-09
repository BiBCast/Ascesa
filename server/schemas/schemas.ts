import { Schema, Types, model } from "mongoose";
// [] one 2 many
const User = new Schema({
  _id: Schema.Types.ObjectId,
  user: String,
  messages: { type: Types.ObjectId, ref: "Message" },
  channel_ids: { type: Types.ObjectId, ref: "Channel" },
});

const message = new Schema({
  _creator: { type: Types.ObjectId, ref: "User" },
  content: String,
  user_id: { type: Types.ObjectId, ref: "User" },
});

const channel = new Schema({
  _id: Schema.Types.ObjectId,
  title: String,
  users: { type: Types.ObjectId, ref: "User" },
});

export const schemaUser = model("User", User);
export const schemaMessage = model("Message", message);
export const schemaChannel = model("Channel", channel);
