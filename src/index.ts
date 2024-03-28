import { createYoga, createSchema } from "graphql-yoga";
import { resolvers } from "./resolvers";
import { readFileSync } from "node:fs";

const typeDefs = readFileSync("./src/schema.graphql", "utf8");

const schema = createSchema({
  typeDefs,
  resolvers,
});

const yoga = createYoga({
  schema,
  graphiql: true,
});

self.addEventListener("fetch", yoga);
