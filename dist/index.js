"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)(); // why 
const port = 3000;
// create graphql schema
const graphql_1 = require("graphql");
const graphql_http_1 = require("graphql-http");
const schema = new graphql_1.GraphQLSchema({
    query: new graphql_1.GraphQLObjectType({
        name: "Query",
        fields: {
            hello: {
                type: graphql_1.GraphQLString,
                resolve: () => "hello",
            },
        },
    }),
});
//create graphql entry point
app.all("/graphql", (0, graphql_http_1.createHandler)({ schema }));
app.get("/", (req, res) => {
    res.send('Hello World!');
});
app.listen({ port: 4000 });
console.log('Listening to port 4000');
