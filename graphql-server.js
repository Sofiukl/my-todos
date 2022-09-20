var express = require("express");
var { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql");
const graphql = require("graphql");

const schema = buildSchema(
  `
  type RandomDie {
    numSides: Int!
    rollOnce: Int!
    roll(numRolls: Int!): [Int]
  }

  input MessageInput {
    content: String
    author: String
  }

  type Message {
    id: ID!
    content: String
    author: String
  }
  type Query {
    hello: [String],
    printName(name: String!): String,
    getDie(numSides: Int): RandomDie,
    getMessage(id: ID!): Message
  }

  type Mutation {
    createMessage(input: MessageInput): Message
  }
  `
);

//DEFINE GRAPHQL SCHEMA DYNAMICALLY
// When we use this method of creating the API,
// the root level resolvers are implemented on the Query and Mutation types rather than on a root object.
const queryType = new graphql.GraphQLObjectType({
  name: "Query",
  fields: {
    printNameDynamic: {
      type: graphql.GraphQLString,
      args: {
        name: { type: graphql.GraphQLString },
      },
      resolve: (_, { name }) => {
        return `NAME from dynamic schema ${name}`;
      },
    },
  },
});

var schema2 = new graphql.GraphQLSchema({ query: queryType });

// You can use any express middleware here like for logging, authentication etc
const loggingReq = (req, res, next) => {
  console.log(req.ip);
  next();
};

const rootValue = {
  hello: () => {
    return ["Hello World!", "Welcome to GraphQL"];
  },
  printName: (args) => {
    return `Hello ${args.name}`;
  },
  // When you return object types against a GraphQL query, then it has advantages over traditional REST APIs.
  // In stead of calling multiple APIs you can get all data in single API request.
  getDie: ({ numSides }) => {
    return new RandomDie(numSides || 6);
  },
  // If you need to alter data, you should make type Mutation rather than Query
  createMessage: ({ input }) => {
    const id = require("crypto").randomBytes(10).toString("hex");
    fakeDatabase[id] = input;
    return new Message(id, input);
  },
  getMessage: ({ id }) => {
    if (!fakeDatabase[id]) {
      throw new Error("no message exists with id " + id);
    }
    return new Message(id, fakeDatabase[id]);
  },
};

var fakeDatabase = {};

class Message {
  constructor(id, { content, author }) {
    this.id = id;
    this.content = content;
    this.author = author;
  }
}
class RandomDie {
  constructor(numSides) {
    this.numSides = numSides;
  }
  rollOnce() {
    return 1 + Math.floor(Math.random() * this.numSides);
  }
  roll({ numRolls }) {
    const results = [];
    for (let i = 0; i < numRolls; i++) {
      results.push(this.rollOnce());
    }
    return results;
  }
}
const app = express();
app.use(loggingReq);
const graphiql = true;

// graphqlHTTP middleware constructs an Express application based on a GraphQL schema.
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema2,
    rootValue,
    graphiql,
  })
);

app.listen(4000);
console.log("Running GraphQL API server at http://localhost:4000/graphql");
