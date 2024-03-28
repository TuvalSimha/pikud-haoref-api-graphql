import { createYoga, createSchema } from "graphql-yoga";
import { resolvers } from "./resolvers";

const schema = createSchema({
  typeDefs: /* GraphQL */ `
    type Query {
      allAlertsFromToday(orderBy: OrderBy!): [Alert!]!
      alerts(alertsInput: AlertsInput): [Alert!]!
    }

    type Alert {
      date: String
      title: String
      location: String
      category: Int
    }

    enum OrderBy {
      CREATED_AT_DESC
      CREATED_AT_ASC
    }

    input AlertsInput {
      fromDateTime: String
      toDateTime: String
    }
  `,
  resolvers,
});

const yoga = createYoga({
  schema,
  graphiql: true,
});

self.addEventListener("fetch", yoga);
