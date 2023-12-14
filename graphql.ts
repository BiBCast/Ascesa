import { GraphQLSchema, GraphQLObjectType, GraphQLString } from "graphql";
// Construct a schema, using GraphQL schema language
export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      hello: {
        type: GraphQLString,
        resolve: () => "world",
      },
    },
  }),
});
