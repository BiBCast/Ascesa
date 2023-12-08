import express from 'express' // yarn add express
import { createHandler } from 'graphql-http/lib/use/express'
import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql'

/**
 * Construct a GraphQL schema and define the necessary resolvers.
 *
 * type Query {
 *   hello: String
 * }
 */
const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: {
      hello: {
        type: GraphQLString,
        resolve: () => 'world'
      }
    }
  })
})

// Create a express instance serving all methods on `/graphql`
// where the GraphQL over HTTP express request handler is
const app = express()
app.all('/graphql', createHandler({ schema }))

app.listen({ port: 4000 })
