import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
} from "graphql";
// Construct a schema, using GraphQL schema language
//TODO endpoint graphql
//crud , get all
// schema
const ChatType = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    id: { type: GraphQLID },
    user: { type: GraphQLString },
    message: { type: GraphQLString },
  }),
});
//schema and parameter have to match
const RootQuery = new GraphQLObjectType({
  name: "RootqueryType",
  fields: {
    client: {
      type: ChatType,
      args: { id: { type: GraphQLID }, user: { type: GraphQLString } },
      resolve(parent, args) {
        return args;
      },
    },
  },
});

export const ChatSchema = new GraphQLSchema({
  query: RootQuery,
});
