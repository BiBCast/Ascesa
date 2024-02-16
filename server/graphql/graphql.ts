import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
} from "graphql";
import { schemaUser } from "../schemas/schemas";
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
      args: { user: { type: GraphQLString } },
      async resolve(parent, args) {
        //return a json {arg:value,...} and filter about the parameter of the json
        const user = await schemaUser
          .findOne({ user: args["user"] })
          .populate("messages")
          .populate("channel_ids");
        return user;
      },
    },
  },
});

export const ChatSchema = new GraphQLSchema({
  query: RootQuery,
});
