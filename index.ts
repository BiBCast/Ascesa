import express, {Express,Request,Response} from 'express'
import cors from 'cors'
const app :  Express = express() // why
//add allowed origin to cors
const allowedOrigins = ['http://localhost4000']
const options: cors.CorsOptions = {
  origin: allowedOrigins
}
app.use(cors)
//add json middleware  
const port = 3000;
// create graphql schema
import { GraphQLSchema, GraphQLObjectType, GraphQLString } from "graphql";
import { createHandler } from "graphql-http";

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      hello: {
        type: GraphQLString, 
        resolve: () =>    "heeeello",
      },
    },
  }),
});
//create graphql entry point
app.all("/graphql", createHandler({ schema }));

app.get("/", (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen({ port: 4000 });
console.log('Listening to port 4000');