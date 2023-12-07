import express, {Express,Request,Response} from 'express'

const app :  Express = express() // why
//TODO implement graphql and cors
//import cors from 'cors'
//add allowed origin to cors

//app.use(cors)
//add json middleware  
// create graphql schema
/* import { GraphQLSchema, GraphQLObjectType, GraphQLString } from "graphql";
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
}); */
//create graphql entry point
//app.all("/graphql", createHandler({ schema }));

app.get("/", (req: Request, res: Response) => {
  console.log('hello wordsdfsf');
  res.send('Hello World!');
});

app.listen({ port: 4000 },()=>{
  console.log("Server started on port 4000");
  
});