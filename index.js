"use strict";
const express = require("express");
const app = express();
const port = 3000;
// create graphql schema
import { GraphQLSchema, GraphQLObjectType, GraphQLString } from "graphql";
import { createHandler } from "graphql-http";

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fileds: {
      hello: {
        type: GraphQLString,
        resolve: () => "hello",
      },
    },
  }),
});
//create graphql entry point
app.all("/graphql", createHandler({ schema }));
/* 
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/chat", (req, res) => {
  res.send("chat message");
}); */

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
