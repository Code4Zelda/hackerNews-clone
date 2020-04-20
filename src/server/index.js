require("dotenv").config();
const { GraphQLServer } = require("graphql-yoga");
const { prisma } = require("./generated/prisma-client");
const { typeDefs } = require("./schema.js");
const Query = require("./resolvers/Query");
const Mutation = require("./resolvers/Mutation");
const User = require("./resolvers/User");
const Link = require("./resolvers/Link");
const Subscription = require("./resolvers/Subscription");
const Vote = require("./resolvers/Vote");

const resolvers = {
  Query,
  Mutation,
  Subscription,
  User,
  Link,
  Vote,
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
  context: (request) => {
    return {
      ...request,
      prisma,
    };
  },
});
server.start(
  // {
  //   cors: {
  //     credentials: true,
  //     origin: ["http://localhost:3000"],
  //   },
  // },
  () => console.log(`Server is running on PORT ${process.env.GRAPHQL_PORT}`)
);
