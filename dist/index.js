"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)(); // why
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
app.get("/", (req, res) => {
    console.log('hello word');
    res.send('Hello World!');
});
app.listen({ port: 4000 }, () => {
    console.log("Server started on port 4000");
});
