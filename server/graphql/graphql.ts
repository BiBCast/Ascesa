import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLBoolean,
} from "graphql";
import { schemaChannel, schemaMessage, schemaUser } from "../schemas/schemas";
// Construct a schema, using GraphQL schema language
//get all, get by id,
// schema

const ChannelType: GraphQLObjectType = new GraphQLObjectType({
  name: "channelType",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    users: { type: new GraphQLList(UserType) },
  }),
});

const MessageType: GraphQLObjectType = new GraphQLObjectType({
  name: "messageType",
  fields: () => ({
    content: { type: GraphQLString },
    user_id: { type: UserType },
    channel_id: { type: ChannelType },
  }),
});
const UserType: GraphQLObjectType = new GraphQLObjectType({
  name: "userType",
  fields: () => ({
    id: { type: GraphQLID },
    user: { type: GraphQLString },
    messages: { type: new GraphQLList(MessageType) },
    channel_ids: { type: new GraphQLList(ChannelType) },
  }),
});

/* 
[
  [1]   {
  [1]     _id: new ObjectId('65c4ff319f119195e0e95ddf'),
  [1]     user: 'Alice',
  [1]     messages: {
  [1]       _id: new ObjectId('65c4ff319f119195e0e95de2'),
  [1]       _creator: new ObjectId('65c4ff319f119195e0e95ddf'),
  [1]       content: 'Hello, world!',
  [1]       user_id: new ObjectId('65c4ff319f119195e0e95de0'),
  [1]       __v: 0
  [1]     },
  [1]     channel_ids: [ new ObjectId('65c4ff319f119195e0e95de7') ],
  [1]     __v: 0
  [1]   },
  [1]   {
  [1]     _id: new ObjectId('65c4ff319f119195e0e95de0'),
  [1]     user: 'Bob',
  [1]     messages: {
  [1]       _id: new ObjectId('65c4ff319f119195e0e95de3'),
  [1]       _creator: new ObjectId('65c4ff319f119195e0e95de0'),
  [1]       content: 'Hi there!',
  [1]       user_id: new ObjectId('65c4ff319f119195e0e95ddf'),
  [1]       __v: 0
  [1]     },
  [1]     channel_ids: [ new ObjectId('65c4ff319f119195e0e95de7') ],
  [1]     __v: 0
  [1]   }
  [1] ] */
//the json args must have the key of the schema
const RootQuery = new GraphQLObjectType({
  name: "RootqueryType",
  fields: {
    Users: {
      type: new GraphQLList(UserType),
      args: {},
      async resolve() {
        //return a json {arg:value,...} and filter about the parameter of the json
        const users = await schemaUser
          .find({})
          .populate("messages")
          .populate("channel_ids");
        return users;
      },
    },
    User: {
      type: UserType,
      args: { user: { type: GraphQLString }! },
      async resolve(parent, args) {
        //return a json {arg:value,...} and filter about the parameter of the json
        const user = await schemaUser
          .findOne({ user: args["user"] })
          .populate("messages")
          .populate("channel_ids");
        return user;
      },
    },
    ChannelMessages: {
      type: new GraphQLList(MessageType),
      args: {
        channel_id: { type: GraphQLID }!,
        getLastMessage: { type: GraphQLBoolean },
      },
      async resolve(parent, args) {
        //return a json {arg:value,...} and filter about the parameter of the json
        if (args["getLastMessage"]) {
          const messages = await schemaMessage
            .find({
              channel_id: args["channel_id"],
            })
            .sort([["_id", -1]])
            .limit(1)
            .populate("user_id");
          return messages;
        }
        const messages = await schemaMessage
          .find({
            channel_id: args["channel_id"],
          })
          .populate("user_id");

        return messages;
      },
    },

    Channels: {
      type: new GraphQLList(ChannelType),
      args: {},
      async resolve() {
        //return a json {arg:value,...} and filter about the parameter of the json
        const channels = await schemaChannel.find({});
        return channels;
      },
    },
    Channel: {
      type: ChannelType,
      args: { id: { type: GraphQLString }! },
      async resolve(parent, args) {
        //return a json {arg:value,...} and filter about the parameter of the json

        const channel = await schemaChannel.findOne({ _id: args["id"] });
        return channel;
      },
    },
  },
});

export const ChatSchema = new GraphQLSchema({
  query: RootQuery,
});
