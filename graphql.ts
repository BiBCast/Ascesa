import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
} from "graphql";
// Construct a schema, using GraphQL schema language
//get all, get by id, 
// schema
const UserType = new GraphQLObjectType({
  name: "Query",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    message: { type: GraphQLString },
  }),
});
//the json args must have the key of the schema
const RootQuery = new GraphQLObjectType({
  name: "RootqueryType",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLID }},
      resolve(parent, args) {
        //return a json {arg:value,...} and filter about the parameter of the json
        //TODO filter by id   
        return args;
      },
    },
  },
});

export const ChatSchema = new GraphQLSchema({
  query: RootQuery,
});
