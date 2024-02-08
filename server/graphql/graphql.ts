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
const MessageType = new GraphQLObjectType({
  name: "Query2",
  fields: () => ({
    _creator: { type: UserType },
    content: { type: GraphQLString },
    user_id: { type: UserType },
  }),
});
const UserType = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    id: { type: GraphQLID },
    user: { type: GraphQLString },
    messages: { type: new GraphQLList(MessageType) },
  }),
});
//the json args must have the key of the schema
const RootQuery = new GraphQLObjectType({
  name: "RootqueryType",
  fields: {
    Users: {
      type: new GraphQLList(UserType),
      args: {},
      async resolve() {
        //return a json {arg:value,...} and filter about the parameter of the json
        const users = await schemaUser.find({}).populate("messages");
        console.log(users);

        return users;
      },
    },
    User: {
      type: UserType,
      args: { user: { type: GraphQLString } },
      async resolve(parent, args) {
        //return a json {arg:value,...} and filter about the parameter of the json
        const user = await schemaUser.findOne({ user: args["user"] });
        return user;
      },
    },
  },
});

export const ChatSchema = new GraphQLSchema({
  query: RootQuery,
});
