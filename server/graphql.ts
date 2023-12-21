import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
} from "graphql";
import { schemaUser } from "./schemaChat";
// Construct a schema, using GraphQL schema language
//get all, get by id,
// schema
const UserType = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    id: { type: GraphQLID },
    user: { type: GraphQLString },
    message: { type: GraphQLString },
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
        //TODO filter by id
        const users = await schemaUser.find({});
        return users;
      },
    },
    User: {
      type: UserType,
      args: { user: { type: GraphQLString } },
      async resolve(parent, args) {
        //return a json {arg:value,...} and filter about the parameter of the json
        //TODO filter by id
        const user = await schemaUser.findOne({ user: args["user"] });
        return user;
      },
    },
  },
});

export const ChatSchema = new GraphQLSchema({
  query: RootQuery,
});
